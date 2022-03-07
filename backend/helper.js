const users = []
const addUser = ({socket_id, name, user_id, room_id})=>{
    const exit = users.find(user=>user.room_id === room_id && user.user_id === user_id)
    if(exit){
        return {error:'User already in the room'}
    }else{
        const user = {socket_id, name, user_id, room_id};
        users.push(user)
        console.log('User List', users)
        return user
    }
}
const getUser = (socket_id)=>{
    const user = users.find(user => user.socket_id === socket_id)
    console.log('Get User', user.name)
    return user;
}
const removeUser = (socket_id)=>{
    const index = users.findIndex(user => user.socket_id === socket_id)
    if(index !== -1){
        console.log('Remove User', user.name)
        return user.splice(index,1)[0]
    }
}
module.exports = { addUser, removeUser, getUser }