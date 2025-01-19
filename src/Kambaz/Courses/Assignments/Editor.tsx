export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ marginBottom: '20px' }}>
                <label
                    htmlFor="wd-name"
                    style={{
                        display: 'block',
                        fontWeight: 'bold',
                        marginBottom: '5px',
                        fontSize: '16px',
                    }}
                >
                    Assignment Name
                </label>
                <input
                    id="wd-name"
                    value="A1 - ENV + HTML"
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: '8px',
                        fontSize: '14px',
                    }}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <textarea
                    id="wd-description"
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '120px',
                        padding: '8px',
                        fontSize: '14px',
                    }}
                >
                    The assignment is available online Submit a link to the
                    landing page of your Web application running on Netlify. The
                    landing page should include the following: - Your full name
                    and section - Links to each of the lab assignments - Link to
                    the Kambaz application - Links to all relevant source code
                    repositories - The Kambaz application should include a link
                    to navigate back to the landing page.
                </textarea>
            </div>
            <table style={{ width: '100%', marginBottom: '20px' }}>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <label htmlFor="wd-points">Points</label>
                        </td>
                        <td>
                            <input
                                id="wd-points"
                                type="number"
                                value={100}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    fontSize: '14px',
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <label htmlFor="wd-group">Assignment Group</label>
                        </td>
                        <td>
                            <select
                                id="wd-group"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    fontSize: '14px',
                                }}
                            >
                                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                                <option value="QUIZZES">QUIZZES</option>
                                <option value="EXAMS">EXAMS</option>
                                <option value="PROJECTS">PROJECTS</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <label htmlFor="wd-display-grade-as">Display Grade as</label>
                        </td>
                        <td>
                            <select
                                id="wd-display-grade-as"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    fontSize: '14px',
                                }}
                            >
                                <option value="Percentage">Percentage</option>
                                <option value="Complete/Incomplete">Complete/Incomplete</option>
                                <option value="Letter Grade">Letter Grade</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <label htmlFor="wd-submission-type">Submission Type</label>
                        </td>
                        <td>
                            <select
                                id="wd-submission-type"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    fontSize: '14px',
                                }}
                            >
                                <option value="Online">Online</option>
                                <option value="On Paper">On Paper</option>
                                <option value="No Submission">No Submission</option>
                            </select>
                            <div style={{ marginTop: '10px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    <input type="checkbox" id="wd-text-entry" /> Text Entry
                                </label>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    <input type="checkbox" id="wd-website-url" /> Website URL
                                </label>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    <input type="checkbox" id="wd-media-recordings" /> Media
                                    Recordings
                                </label>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    <input type="checkbox" id="wd-student-annotation" /> Student
                                    Annotation
                                </label>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    <input type="checkbox" id="wd-file-upload" /> File Uploads
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <label htmlFor="wd-assign-to">Assign To</label>
                        </td>
                        <td>
                            <input
                                id="wd-assign-to"
                                value="Everyone"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    fontSize: '14px',
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <label htmlFor="wd-due-date">Due</label>
                        </td>
                        <td>
                            <input
                                id="wd-due-date"
                                type="date"
                                value="2024-05-13"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    fontSize: '14px',
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <label htmlFor="wd-available-from">Available from</label>
                        </td>
                        <td>
                            <input
                                id="wd-available-from"
                                type="date"
                                value="2024-05-06"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    fontSize: '14px',
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <label htmlFor="wd-available-until">Until</label>
                        </td>
                        <td>
                            <input
                                id="wd-available-until"
                                type="date"
                                value="2024-05-20"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    fontSize: '14px',
                                }}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style={{ textAlign: 'center' }}>
                <button style={{ marginRight: '10px', padding: '8px 12px' }}>Cancel</button>
                <button style={{ padding: '8px 12px' }}>Save</button>
            </div>
        </div>
    );
}
