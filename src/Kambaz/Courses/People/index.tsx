import PeopleTable from "./Table";

export default function People({ currentUser }: { currentUser?: any }) {
  return (
    <div id="wd-people" className="pe-5">
      <h2>Course Members</h2>
      <div className="wd-people-description mb-3">
        <p>Here are all the users enrolled in this course. Teachers can add, edit, and delete members.</p>
      </div>
      <PeopleTable currentUser={currentUser} />
    </div>
  );
}
