import React, {useState, useRef} from 'react'
import './css/new-contact.css'
import { useHistory, Link } from 'react-router-dom'

const NewContact = () => {

    const history = useHistory()

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const phoneNumberRef = useRef()

    const [image, setImage] = useState("https://www.history.ox.ac.uk/sites/default/files/history/images/person/unknown_9.gif")

    const handleChangeinput = (e) =>{
        e.preventDefault()
        let file = e.target.files[0]
        file.src = URL.createObjectURL(e.target.files[0])
        setImage(file.src)
        URL.revokeObjectURL(file)
    }

    const handleFormSubmit = (e) =>{
        e.preventDefault()
        const firstName = firstNameRef.current.value
        const lastName = lastNameRef.current.value
        const phoneNumber = phoneNumberRef.current.value
        const fullName = firstName + " " + lastName

        const contactData = {
            name: fullName,
            number: phoneNumber,
            image: image
        }
        
        fetch("https://6124fb4ec334850017459065.mockapi.io/contacts",{
            method: "POST",
            body: JSON.stringify(contactData),
            headers:{
                'Content-Type':"application/json"
            }
        }).then(()=>{
            history.replace('/')
        })
    }

    return (
        <div className="card">
            <div className="navbar">
                <Link to="/"><img src="https://static.thenounproject.com/png/53554-200.png" className="go-back" alt="" /></Link>
                <h2 className="add-new-contact">Add New Contact</h2><br/>
            </div>
            <hr className="line"/>
            <form action="" onSubmit={handleFormSubmit} className="new-contact-form">
                <label className="custom-file-upload">
                    <input type="file" accept="image/*" id="file" onChange={handleChangeinput}/>
                    Upload Contact Pic
                </label>
                <img src={image} alt="" className="contact-pic"/>
                <div className="form-control">
                    <label htmlFor="fn">First Name:</label><br/>
                    <input className="form-input" type="text" id="fn" required ref={firstNameRef}/>
                </div>
                <div className="form-control">
                    <label htmlFor="ln">Last Name:</label><br/>
                    <input className="form-input" type="text" id="ln" required ref={lastNameRef}/>
                </div>
                <div className="form-control">
                    <label htmlFor="number">Phone Number:</label><br/>
                    <input className="phone-form" type="number" id="number" required size="10" ref={phoneNumberRef}/>
                </div>
                <input className="submit-form" value="Add Contact" type="submit"/>
            </form>

        </div>
    )
}

export default NewContact
