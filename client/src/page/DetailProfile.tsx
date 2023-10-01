import React from 'react'

interface Props {
    
}

const DetailProfile = (props: Props) => {
    return (
        <div>
            detail profile
<<<<<<< Updated upstream
=======
            <div className='profile-header flex'>
                <div className="profile-thumbnail"></div>
                {
                    !user 
                    ? <Avatar className="profile-avatar" shape="circle" icon={<UserOutlined />}></Avatar>
                    : <img alt="User's avatar" src={user?.avatarSrc} /> 
                }
                <h2>{user? user.username : 'Test Username'}</h2>
            </div>
            <ParticipantProfileForm 
                classNames="profile-participant"
                canEdit={canEdit}
                user={user}
            />
>>>>>>> Stashed changes
        </div>
    )
}

export default DetailProfile
