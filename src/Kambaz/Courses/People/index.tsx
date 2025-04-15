import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  CourseParticipant,
  getCourseParticipants,
  PaginationParams
} from '../../../services/CourseUserService';
import './People.css';

/**
 * People component for displaying and managing course participants
 */
export default function People() {
  const { cid } = useParams<{ cid: string }>();

  // const { currentUser } = useUser();
  const [participants, setParticipants] = useState<CourseParticipant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  // Paging related status
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // fetch participants
  const fetchParticipants = async (params: PaginationParams) => {
    if (!cid) return;

    setLoading(true);
    try {
      const response = await getCourseParticipants(cid, params);

      setParticipants(response.data);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPages: response.totalPages
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching participants:', err);
      setError('Unable to load course participants. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  //the first load and pagination params change
  useEffect(() => {
    fetchParticipants({
      page: pagination.page,
      limit: pagination.limit,
      search: searchTerm.trim() !== '' ? searchTerm : undefined
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid, pagination.page, pagination.limit]);

  // handle search change, add debounce
  useEffect(() => {

    // Clear the previous timer
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }


    // Set a new timer to delay 500ms before performing the search
    const timeout = setTimeout(() => {
      // Reset the page number to 1 and search using the current search term
      setPagination(prev => ({ ...prev, page: 1 }));
      fetchParticipants({
        page: 1,
        limit: pagination.limit,
        search: searchTerm.trim() !== '' ? searchTerm : undefined
      });
    }, 500);

    setSearchTimeout(timeout);

    // clear timer
    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  // Change the number of items displayed per page
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value);
    setPagination(prev => ({ ...prev, page: 1, limit: newLimit }));
  };

  // Divide participants into teachers and students
  const instructors = participants?.filter(p =>
    p.role === 'INSTRUCTOR' ||
    (p.user && (p.user.role === 'FACULTY' || p.user.role === 'ADMIN'))
  ) || [];

  const students = participants?.filter(p =>
    p.role === 'STUDENT' ||
    (p.user && p.user.role === 'USER' &&
      p.role !== 'INSTRUCTOR' &&
      !instructors.some(i => i._id === p._id))
  ) || [];


  //Format date display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Generate paging components
  const renderPagination = () => {
    const { page, totalPages } = pagination;

    // If there is only one page, do not display the paging component
    if (totalPages <= 1) return null;

    // Generate page numbers
    const pageNumbers = [];
    const pageRange = 2;

    // Start page and end page
    let startPage = Math.max(1, page - pageRange);
    let endPage = Math.min(totalPages, page + pageRange);

    // Make sure there are always enough pages displayed
    if (endPage - startPage + 1 < pageRange * 2 + 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + pageRange * 2);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - pageRange * 2);
      }
    }

    // Add apge
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key="first"
          onClick={() => handlePageChange(1)}
          className="page-button"
        >
          1
        </button>
      );

      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis-start" className="ellipsis">...</span>);
      }
    }

    // Add mid page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-button ${i === page ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Add last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis-end" className="ellipsis">...</span>);
      }

      pageNumbers.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          className="page-button"
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="pagination-container">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="page-button nav-button"
        >
          &laquo; prev
        </button>
        <div className="page-numbers">
          {pageNumbers}
        </div>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="page-button nav-button"
        >
          next &raquo;
        </button>
        <div className="limit-selector">
          <label htmlFor="limit-select">Each page：</label>
          <select
            id="limit-select"
            value={pagination.limit}
            onChange={handleLimitChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="wd-people">
      <h2>Course Participants</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search participants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && (!participants || participants.length === 0) && (
        <div className="loading">Loading participants...</div>
      )}

      {error && (!participants || participants.length === 0) && (
        <div className="error">{error}</div>
      )}


      {/* Teacher list */}
      <section className="participant-section">
        <h3>Instructors ({instructors.length})</h3>
        {instructors.length === 0 ? (
          <p className="no-results">No instructors found.</p>
        ) : (
          <ul className="participant-list">
            {instructors.map(instructor => (
              <li key={instructor._id} className="participant-item">
                <div className="participant-info">
                  <div className="participant-name">
                    {instructor.user.username || "No one"}
                  </div>
                  <div className="participant-email">{instructor.user.email}</div>
                  <div className="participant-joined">
                    Joined on {formatDate(instructor.joinedDate)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* student list */}
      <section className="participant-section">
        <h3>Students ({students.length})</h3>
        {students.length === 0 ? (
          <p className="no-results">No students found.</p>
        ) : (
          <ul className="participant-list">
            {students.map(student => (
              <li key={student._id} className="participant-item">
                <div className="participant-info">
                  <div className="participant-name">
                    {student.user.username || "No one"}
                  </div>
                  <div className="participant-email">{student.user.email}</div>
                  <div className="participant-joined">
                    Joined on {formatDate(student.joinedDate)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {renderPagination()}
    </div>
  );
}
