export default function Modules() {
    return (
        <div id="wd-modules">
            {/* Action Buttons */}
            <div id="wd-modules-buttons">
                <button id="wd-collapse-all">Collapse All</button>
                <button id="wd-view-progress">View Progress</button>

                {/* Dropdown for Publish All */}
                <select id="wd-publish-all-dropdown" defaultValue="Publish All">
                    <option disabled>Publish All</option>
                    <option value="Publish Week 1">Publish Week 1</option>
                    <option value="Publish Week 2">Publish Week 2</option>
                    <option value="Publish All Lectures">Publish All Lectures</option>
                </select>

                <button id="wd-add-module">+ Module</button>
            </div>
            <hr />
            {/* Modules Content */}
            <div id="wd-modules-content">
                <ul>
                    {/* Week 1, Lecture 1 */}
                    <li>
                        <strong>Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</strong>
                        <ul>
                            <li>LEARNING OBJECTIVES
                                <ul>
                                    <li>Introduction to the course</li>
                                    <li>Learn what is Web Development</li>
                                </ul>
                            </li>
                            <li>READING
                                <ul>
                                    <li>Full Stack Developer - Chapter 1 - Introduction</li>
                                    <li>Full Stack Developer - Chapter 2 - Creating User Interfaces</li>
                                </ul>
                            </li>
                            <li>SLIDES
                                <ul>
                                    <li>Introduction to Web Development</li>
                                    <li>Creating an HTTP server with Node.js</li>
                                    <li>Creating a React Application</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    {/* Week 1, Lecture 2 */}
                    <li>
                        <strong>Week 1, Lecture 2 - Formatting User Interfaces with HTML</strong>
                        <ul>
                            <li>LEARNING OBJECTIVES
                                <ul>
                                    <li>Learn how to create user interfaces with HTML</li>
                                    <li>Deploy the assignment to Netlify</li>
                                </ul>
                            </li>
                            <li>SLIDES
                                <ul>
                                    <li>Introduction to HTML and the DOM</li>
                                    <li>Formatting Web content with Headings and Formatting</li>
                                    <li>Formatting content with Lists and Tables</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
