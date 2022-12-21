

function EditProfileForm () {
    const [, setDescription] = useState("");

  
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>


            </form>
        </>
    )

}

export default EditProfileForm;
