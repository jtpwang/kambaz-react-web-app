import axios from "axios";
import { courses } from "../Database.js";

// 定義 API 端點
// 先嘗試使用環境變數，如果沒有則使用默認值
let REMOTE_SERVER = "http://localhost:4000";
try {
  // 在 Node.js 環境中無法直接使用 import.meta.env
  if (process.env.VITE_REMOTE_SERVER) {
    REMOTE_SERVER = process.env.VITE_REMOTE_SERVER;
  }
} catch (error) {
  console.log("未找到環境變數 VITE_REMOTE_SERVER，使用默認值");
}

const COURSES_API = `${REMOTE_SERVER}/api/courses`;

/**
 * 將課程資料匯入後端資料庫
 */
async function importCoursesToBackend() {
  console.log("開始匯入課程資料到後端...");
  console.log(`使用 API 端點: ${COURSES_API}`);
  console.log(`準備匯入 ${courses.length} 門課程`);

  // 建立 axios 實例
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  });

  let successCount = 0;
  let errorCount = 0;

  // 依序匯入每一門課程
  for (const course of courses) {
    try {
      // 檢查課程是否已存在 (使用課程 ID)
      const checkResponse = await axiosInstance.get(`${COURSES_API}/${course._id}`);
      
      if (checkResponse.data && checkResponse.data._id) {
        console.log(`課程 "${course.name}" (${course._id}) 已存在，跳過`);
        continue;
      }
    } catch (error) {
      // 課程不存在，繼續匯入
      if (error.response && error.response.status === 404) {
        console.log(`課程 "${course.name}" (${course._id}) 不存在，準備匯入`);
      } else {
        console.error(`檢查課程 "${course.name}" 時發生錯誤:`, error.message);
      }
    }

    // 匯入課程
    try {
      const response = await axiosInstance.post(COURSES_API, course);
      console.log(`成功匯入課程: "${course.name}" (${course._id})`);
      successCount++;
    } catch (error) {
      console.error(`匯入課程 "${course.name}" 失敗:`, error.message);
      errorCount++;
    }
  }

  console.log("匯入程序完成");
  console.log(`成功匯入: ${successCount} 門課程`);
  console.log(`匯入失敗: ${errorCount} 門課程`);
}

// 如果直接執行此腳本，就執行匯入程序
if (require.main === module) {
  importCoursesToBackend()
    .then(() => console.log("匯入腳本執行完畢"))
    .catch(error => console.error("匯入過程中發生錯誤:", error));
} else {
  // 如果作為模組被導入，就導出函數供其他模組使用
  module.exports = { importCoursesToBackend };
}
