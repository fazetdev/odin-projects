import { useState } from "react";

function EducationInfo() {
  const [formData, setFormData] = useState({
    school: "",
    study: "",
    date: "",
  });

  const [isEditing, setIsEditing] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  return (
    <section>
      <h2>Education</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>School Name: </label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Title of Study: </label>
            <input
              type="text"
              name="study"
              value={formData.study}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Date of Study: </label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p><strong>School:</strong> {formData.school}</p>
          <p><strong>Study:</strong> {formData.study}</p>
          <p><strong>Date:</strong> {formData.date}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </section>
  );
}

export default EducationInfo;
