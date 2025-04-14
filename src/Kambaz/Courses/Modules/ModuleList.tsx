import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Module, getAllModules, toggleModulePublished, deleteModule } from '../../../services/ModuleService';
import ModuleForm from './ModuleForm';
import ModuleItem from './ModuleItem';
import { User } from '../../../contexts/UserContext';
import { useUser } from '../../../contexts/useUser';
import './Module.css';

// 檢查用戶是否有權限編輯模組（ADMIN 或 FACULTY 角色）
const hasEditPermission = (user: User | null) => {
  return user && (user.role === 'ADMIN' || user.role === 'FACULTY');
};

export default function ModuleList() {
  const { cid } = useParams<{ cid: string }>();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const { currentUser } = useUser();

  console.log("ModuleList - courseId:", cid);
  console.log("ModuleList - currentUser:", currentUser);

  // 獲取模組列表（使用 useCallback 記憶函數）
  const fetchModules = useCallback(async () => {
    if (!cid) {
      console.error("ModuleList - Missing course ID");
      setError("Missing course ID");
      setLoading(false);
      return;
    }

    console.log("ModuleList - Fetching modules for course ID:", cid);
    setLoading(true);
    try {
      const response = await getAllModules(cid);
      console.log("ModuleList - API Response:", response);

      // 直接檢查模組數據
      if (response && response.data && response.data.modules) {
        // 根據 order 屬性排序模組
        const sortedModules = [...response.data.modules].sort((a, b) => a.order - b.order);
        console.log("ModuleList - Sorted modules:", sortedModules);
        setModules(sortedModules);
      } else {
        console.error("ModuleList - Invalid response format:", response);
        setError('Invalid response format from server');
      }
    } catch (err) {
      console.error('ModuleList - Error fetching modules:', err);
      setError('An error occurred while fetching modules. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [cid]);

  useEffect(() => {
    console.log("ModuleList - useEffect triggered");
    // 獲取模組列表
    fetchModules();
  }, [fetchModules]);

  // 切換模組的展開/折疊狀態
  const toggleModuleExpand = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  // 折疊全部模組
  const collapseAll = () => {
    setExpandedModules(new Set());
  };

  // 展開全部模組
  const expandAll = () => {
    const allModuleIds = modules.map(module => module._id);
    setExpandedModules(new Set(allModuleIds));
  };

  // 處理模組發布狀態切換
  const handleTogglePublish = async (moduleId: string, currentStatus: boolean) => {
    if (!cid) return;

    // 找到要更新的模組
    const moduleToUpdate = modules.find(m => m._id === moduleId);
    if (!moduleToUpdate) {
      console.error('ModuleList - Cannot find module to toggle publish status:', moduleId);
      return;
    }

    // 先在 UI 上樂觀地更新狀態，使用戶感受更快的響應
    setModules(prev =>
      prev.map(module => {
        if (module._id === moduleId) {
          return { ...module, isPublished: !currentStatus };
        }
        return module;
      })
    );

    try {
      // 呼叫 API 更新後端狀態
      console.log(`正在${!currentStatus ? '發布' : '取消發布'}模組 ${moduleToUpdate.title}`);
      const updatedModule = await toggleModulePublished(moduleId, !currentStatus);
      
      // 確認 API 回應中的發布狀態
      console.log('收到模組更新響應:', updatedModule);
      
      // 使用後端回傳的實際狀態更新 UI（以防止前後端不一致）
      setModules(prev =>
        prev.map(module => {
          if (module._id === moduleId) {
            return { ...module, isPublished: updatedModule.isPublished };
          }
          return module;
        })
      );
      
      // 提示用戶操作成功
      setError(null);
    } catch (err) {
      console.error('ModuleList - Error toggling module published status:', err);
      
      // 還原為原始狀態
      setModules(prev =>
        prev.map(module => {
          if (module._id === moduleId) {
            return { ...module, isPublished: currentStatus };
          }
          return module;
        })
      );
      
      // 顯示錯誤信息
      setError(err instanceof Error ? err.message : '更新模組狀態失敗，請稍後再試。');
    }
  };

  // 刪除模組
  const handleDeleteModule = async (moduleId: string) => {
    if (!cid) return;

    if (window.confirm('Are you sure you want to delete this module?')) {
      try {
        await deleteModule(moduleId);

        // 從列表中移除已刪除的模組
        setModules(prev => prev.filter(module => module._id !== moduleId));
      } catch (err) {
        console.error('ModuleList - Error deleting module:', err);
        setError('Failed to delete module. Please try again.');
      }
    }
  };

  // 處理模組更新
  const handleModuleUpdated = async (updatedModule: Module) => {
    // 更新列表中的模組
    setModules(prev =>
      prev.map(module => module._id === updatedModule._id ? updatedModule : module)
    );
    
    // 關閉編輯表單
    setEditingModuleId(null);
  };

  // 新增模組後的回調
  const handleModuleAdded = (newModule: Module) => {
    setModules(prev => [...prev, newModule].sort((a, b) => a.order - b.order));
    setShowAddForm(false);
  };

  // 取消添加或編輯
  const handleCancel = () => {
    setShowAddForm(false);
    setEditingModuleId(null);
  };

  if (loading && modules.length === 0) {
    return <div className="loading">Loading modules...</div>;
  }

  if (error && modules.length === 0) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="wd-modules">
      {/* 操作按鈕 */}
      <div className="wd-modules-buttons">
        <button
          className="wd-collapse-all"
          onClick={collapseAll}
        >
          Collapse All
        </button>
        <button
          className="wd-expand-all"
          onClick={expandAll}
        >
          Expand All
        </button>

        {/* 只有有權限的用戶可以看到添加模組按鈕 */}
        {hasEditPermission(currentUser) && (
          <button
            className="wd-add-module"
            onClick={() => setShowAddForm(true)}
          >
            + Module
          </button>
        )}
      </div>

      <hr />

      {/* 添加模組表單 */}
      {showAddForm && cid && (
        <ModuleForm
          courseId={cid}
          onSuccess={handleModuleAdded}
          onCancel={handleCancel}
        />
      )}

      {/* 模組列表 */}
      {modules.length === 0 ? (
        <div className="no-modules">No modules available for this course yet.</div>
      ) : (
        <div className="wd-modules-content">
          <ul className="modules-list">
            {modules.map(module => (
              <ModuleItem
                key={module._id}
                module={module}
                isExpanded={expandedModules.has(module._id)}
                onToggleExpand={() => toggleModuleExpand(module._id)}
                onTogglePublish={hasEditPermission(currentUser) ? () => handleTogglePublish(module._id, module.isPublished) : undefined}
                onEdit={hasEditPermission(currentUser) ? () => setEditingModuleId(module._id) : undefined}
                onDelete={hasEditPermission(currentUser) ? () => handleDeleteModule(module._id) : undefined}
              />
            ))}
          </ul>
        </div>
      )}

      {/* 編輯模組表單 */}
      {editingModuleId && cid && (
        <div className="module-edit-overlay">
          <div className="module-edit-form">
            <ModuleForm
              courseId={cid}
              moduleId={editingModuleId}
              onSuccess={handleModuleUpdated}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
