import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact }) => {
	const contactContext = useContext(ContactContext);
	const { deleteContact, setCurrent, clearCurrent } = contactContext;
	const { _id, name, email, phone, type } = contact;

	const onDelete = () => {
		deleteContact(_id);
		clearCurrent();
	};

	return (
		<div className="card bg-light">
			<div className="name-badge-container">
				<span className={"badge " + (type === "professional" ? "badge-orange" : "badge-blue")}>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
				<h3 className="text-primary text-left">{name} </h3>
			</div>
			<ul className="list">
				{email ? (
					<li>
						<i className="contact-item-icon fas fa-envelope-open" />
						{email}
					</li>
				) : (
					"No email present"
				)}
				{phone ? (
					<li>
						<i className="contact-item-icon fas fa-phone" />
						{phone}
					</li>
				) : (
					"No phone present"
				)}
			</ul>
			<div>
				<button className="home-button edit-button" onClick={() => setCurrent(contact)}>
					Edit
				</button>
				<button className="home-button delete-button" onClick={onDelete}>
					Delete
				</button>
			</div>
		</div>
	);
};

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired
};

export default ContactItem;
