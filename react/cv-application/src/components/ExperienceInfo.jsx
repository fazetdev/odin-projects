import { useState } from "react";
import "../styles/ExperienceInfo.css";  // 👈 import CSS

function ExperienceInfo() {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    responsibilities: "",
    from: "",
    until: "",
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
      <h2>Experience</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Company Name: </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Position Title: </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Main Responsibilities: </label>
            <textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Date From: </label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Until: </label>
            <input
              type="text"
              name="until"
              value={formData.until}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p><strong>Company:</strong> {formData.company}</p>
          <p><strong>Position:</strong> {formData.position}</p>
          <p><strong>Responsibilities:</strong> {formData.responsibilities}</p>
          <p><strong>From:</strong> {formData.from}</p>
          <p><strong>Until:</strong> {formData.until}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </section>
  );
}

export default ExperienceInfo;
