import React, {useState, useRef, useEffect} from 'react'
import './css/contacts.css'
import Bars from './imgs/bars.png'
import Search from './imgs/Search.png'
import addContact from './imgs/addContact.png'
import {Link} from 'react-router-dom'

const Contacts = () => {

    const [contactsList, setContactsList] = useState([])
    const [showSearch, setShowSearch] = useState(false)
    const [showSort, setShowSort] = useState(false)
    const [filteredContacts, setFilteredContacts] = useState(contactsList)
    const [nothingFound, setNothingFound] = useState(false)
    // eslint-disable-next-line
    const [test, setTest] = useState(false)

    useEffect(()=>{
        fetch("https://6124fb4ec334850017459065.mockapi.io/contacts").then(res=>{
            return res.json()
        }).then(data=>{
            const contacts = []
            for (const key in data){
                const contact = {
                    id: key,
                    ...data[key]
                }
                contacts.push(contact)
            }
            setContactsList(contacts)
            setFilteredContacts(contacts)
        })
    },[])


    const searchRef = useRef()


    const handleSearch = () =>{
        setShowSearch(!showSearch)
        setFilteredContacts(contactsList)
        setNothingFound(false)
        setShowSort(false)
    }

    const handleDropdown = (e) =>{
        e.preventDefault()
        let option = e.target.value
        setTest(true)
        setFilteredContacts(contactsList)
        switch (option) {
            case "Oldest to Newest" :
                setFilteredContacts(contactsList)
                break;
            case "":
                setFilteredContacts(contactsList)
                break;
            case "Recently Added":
                let testList = contactsList
                let reversedList = testList.map(testList.pop,[...testList])
                setFilteredContacts(reversedList)
                break;
            case "A-Z":
                let list = filteredContacts
                list.sort((a, b) => a.name.localeCompare(b.name))
                setFilteredContacts(list)
                break;
            case "Z-A":
                let array = filteredContacts
                array.sort((a, b) => a.name.localeCompare(b.name)).reverse()
                setFilteredContacts(array)
                break;
            default:
                break;
        }
    }


    const filterContacts = (e) =>{
        e.preventDefault()
        setNothingFound(false)
        const enteredSearch = searchRef.current.value.trim()
        if (!enteredSearch){
            setNothingFound(false)
        }
        let filtered_contacts = contactsList.filter(contact=>{
            return contact.name.toLowerCase().includes(enteredSearch.toLowerCase()) || contact.number.includes(enteredSearch)
        }) 
        if(filtered_contacts.length === 0){
            setNothingFound(true)
        }
        setFilteredContacts(filtered_contacts)
    }

    const handleSortDropdown = () =>{
        setShowSort(!showSort)
    }


    const deleteContact = (contact) =>{
        
        fetch(`https://6124fb4ec334850017459065.mockapi.io/contacts/${contact.id}`,{
            method: "DELETE",
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json'
            } 
        }).then(()=>{
            window.location.reload()
        })
    }

    const close_icon = "data:image/png;base64,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"
    const delete_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8AAADr6+uQkJDw8PASEhKfn59DQ0PMzMz29vbb29vDw8NmZmYnJyf8/PxiYmKAgICKiop3d3eurq7BwcFra2svLy/l5eXW1tbJyck4ODidnZ0hISFJSUmMjIxYWFi4uLgVFRVPT080NDSpqalFDIlPAAAEPklEQVR4nO2daV/aQBCHCaAcUpBLLYfGlu//GattQZiJwM6xs7X/5+3+kp0n1x7ZZFotAAAAAAAAvjrjK4mOU8K4nq2qBDaj3WN0zCm0Zyl2e7Z30XFfy1jk985qGB37VXyX+r0zjY7+Cp41gm+ncRAtcImRTvCNdrTCeZZqwaoq+ix2DASrh2iLMwwtBIt+3CQ18mcotvFXtRPHjKJNPmNrZVh1o1WaeTQTrDrRLs3c2xlW0S6NjA0Fqzrapom5pWEv2qaJbyzM79duOuCjkQJHGU8syJRWjXVnZ26BipnQGF9StubHp7jeaVd+jf7mgW5+6xSoGNbn3qRtz55Trz5xymGnMPEc8LYm7Rpwp2YBpk4Rsv5C0n3sT4/Gl/ws5H2+okYYfGCY3p6xg1TUMJG12II+Cb/Q7eMUM2DB1YK9sJ3MjcNUcGty+Nk85Mo6TjmvNDbR+K7NjtOTdaBS+OyFbM7zhe5maRyoGBbZRLafO3akCumc8i6pdOizoTtamwZKeWKnxp0b6YarnUDQbGowD4JbNjrkVPqpgoZTg3lIvmWNXkHkI7kXC8PigCEMyweG/6HhP9fipw9JoyNOZZFsuI4OOQ3JEhU++VIwI9ka1W77A/rkuTkuzEB3SgLoHAdgsQaXDuRvDPaZBH31Y/5uCobuwFANDN2BoRoYugNDNTB0B4ZqYOgODNXA0B0YqoGhOzBUA8M3bkeTv4zWTROY8+W+fNJp+nRr8VE+5atn4w3Hpwua+Hqt0y/buMLpGlW2yjvekCyiZUvbyEsC9p6BLmqj5fGGpJxFSD9OpMsX6TJjugKoPEN6mdLPoujqPvpdEP2FBAzVwBCGMIQhDPXAEIYwhCEM9cAQhjCEIQz1wBCGMIQhDPXAEIYwhCEM9cAQhjCEIQz1wBCGMIQhDPXAEIYwhCEM9cAQhjCEIQz1wBCGMIQhDPXAEIYwhCEM9cAQhjCEYQGGNAsOLf9Byum/P2h2QJrNKt6Q5BRj2QFJksotLSeZSNn+4w1Pf3zxk/++ZXn2FFIFljKqAMPWYnq/p27aRf/5UN6YFW/YOZTv+AEqwdAXGKqBoTswVANDd2CoBobuwFANDN2BoZqvb8jSp1tXcAk6yyHJAHwWZpg7oTTNv1xbVzCmhsn5d5XQ+tMzyV2CzqWJEsTLYdkKpbm/P6dHasj8qKEPGoe7hP4jlv/p1xVau8OTbk6rWNnX8TksVaEg0/gleNpO3+T1FypvnI9Uwiqp1v1M0P9EV/xHyxbQJjeUnoNgWflzPS7SVmsVrXWEi2BrEa31gVd34yFa7IBFZtUm+tFie8zHFQdYvyYGlwfpH8a0+x2DR1u4p4h85PbjpmMKeJ56dxbraMFnZ0GeSyQzObr7j5vLcbiRaVDKxtu5WHq19IzB+jXAb8bzC3ky3N1Ptr1cvMzWuef2AAAAAAAAAAAAAPLyC3dbbXDcxmFLAAAAAElFTkSuQmCC"

    return (
        <div className="card">
            <div className="navbar">
                {showSearch?
                <form onChange={filterContacts} className="search-form">
                    <input autoFocus className="search-bar" type="text" placeholder="Search..." ref={searchRef}/>
                    <img className="close-search" src={close_icon} onClick={handleSearch} alt=""/>
                </form> :
                <>
                    <img src={Bars} alt="" className="bars" onClick={handleSortDropdown}/>
                    {showSort? <select name="sort" id="sort" className="sort-dropdown" onChange={handleDropdown}>
                        <option value="">Sort By:</option>
                        <option value="Recently Added">Recently Added</option>
                        <option value="Oldest to Newest">Oldest to Newest</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>: null}
                    {showSort? null: <h2 className="title">Contacts</h2>}
                    <img src={Search} alt="" className="search" onClick={handleSearch}/>
                </>}
            </div>
            <hr className="line"/>{ nothingFound? <h2 className="nothing-found">No Contacts Found!</h2>:
            <div className="contacts">
                {filteredContacts.map(contact=>{
                    return(
                        <div className="contact" key={contact.id} id={contact.id}>
                            <img className="contact-img" src={contact.image} alt=""/>
                            <img src={delete_icon} alt="" className="delete-contact" onClick={(params) =>{deleteContact(contact)}} />
                            <h4 className="contact-name">{contact.name}</h4>
                            <p className="contact-number">{contact.number}</p>
                    </div>)})}
            </div>}

            <div>
                {showSearch? null: <Link to="/new-contact"><img className="add-contact" src={addContact} alt=""/></Link>}
            </div>
            
        </div>
    )
}

export default Contacts
