import axios from 'axios'

const fetchallPosts = async()=>{
    try{
        const result =await axios.get('http://localhost:6500/api/posts')
        return result
    }catch(err){
        console.log(err)
    }
}


export default fetchallPosts