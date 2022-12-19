import {TextField, Box, Button} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { ME } from '../../context/queries';
import { UPDATE_PROFILE_SETTINGS } from '../../context/mutations';
import { useState } from 'react'
import "./settings.css"

export default function Settings() {
    const [profilePicture, setProfilePicture] = useState()
    const [aboutMe, setAboutMe] = useState()
    const [age,setAge] = useState()
    const [status,setStatus] = useState()
    const [media,setMedia] = useState()
    const [widget,setWidget] = useState()

    // handle input change
    const handleChangeProfilePicture = (e) => {
        const { value } = e.target;
        setProfilePicture(value)
    }
    const handleChangeAboutMe = (e) => {
        const { value } = e.target;
        setAboutMe(value)
    }
    const handleChangeAge = (e) => {
        const { value } = e.target;
        setAge(value)
    }
    const handleChangeStatus = (e) => {
        const { value } = e.target;
        setStatus(value)
    }
    const handleChangeMedia = (e) => {
        const { value } = e.target;
        setMedia(value)
    }
    const handleChangeWidget = (e) => {
        const { value } = e.target;
        setWidget(value)
    }
    
    // mutation for updating data
    const [UpdateProfileSettings,{ error_mutation }] = useMutation(UPDATE_PROFILE_SETTINGS) 

    // todo filter form data to only include defined values
    // todo repair mutation to properly accept/update form data
    const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
    console.log('form data: ', profilePicture, aboutMe, age, status, media, widget)
      const { data } = await UpdateProfileSettings({
        variables: { profilePicture, aboutMe, age, status, media, widget },
      });
      window.location.replace('/Profile');
    } catch (err) {
      console.error(err);
    }
    }

    // get profile data
    const { loading, error, data } = useQuery(ME);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const profile = data.me.profile
    console.log(profile)

    return (
        <div>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100ch' },
            }}
            noValidate
            autoComplete="off"
            className="settingsContainer"
        >
            <TextField defaultValue={profile.profilePicture} value={profilePicture} onChange={handleChangeProfilePicture} id="outlined-basic" label="Profile Picture" variant="outlined" />
            <TextField defaultValue={profile.aboutMe} value={aboutMe} onChange={handleChangeAboutMe} id="outlined-basic" label="About Me" variant="outlined"/>
            <TextField defaultValue={profile.age} value={age} onChange={handleChangeAge} id="outlined-basic" label="Age" variant="outlined" />
            <TextField defaultValue={profile.status} value={status} onChange={handleChangeStatus} id="outlined-basic" label="Status" variant="outlined" />
            <TextField defaultValue={profile.mediaContainer} value={media} onChange={handleChangeMedia} id="outlined-basic" label="Media" variant="outlined" />
            <TextField defaultValue={profile.widgetContainer} value={widget} onChange={handleChangeWidget} id="outlined-basic" label="Widget" variant="outlined" />
            <Button onClick={handleFormSubmit} variant="outlined">Upload</Button>    
        </Box>
        </div>
    )
}