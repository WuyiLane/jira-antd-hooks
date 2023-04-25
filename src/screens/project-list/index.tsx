import {SearchPanel} from "./search-panel";
import  List from './list'
import {useEffect, useState} from "react";
import {cleanObject, useDebounce, useMount} from '../../utils'
import qs from "qs";

type UserType ={
    id:number,
    name:string
}
type ProjectType ={
    id:string,
    name:string,
    personId:number,
    ths:string,
    strings:string,
    caters:string,
    createTime:string,
    keg:string,
}
const apiUrl = process.env.REACT_APP_API_URL;


export const ProjectListScreen = ():JSX.Element =>{
    const [param, setParam] = useState<{name:string,personId:string}>({
        name: '', personId: ''
    })
    const [users,setUsers] = useState<UserType[]>([])
    const [list,setList] = useState<ProjectType[]>([])
    const  useDebounceParam = useDebounce(param,2000)
    useEffect(() =>{
        fetch(`${apiUrl}/projects?${qs.stringify({...cleanObject(useDebounceParam)})}`).then(async  res =>{
            if(res.ok){
                setList(await res.json())
            }
        })
        //   fetch('./_json_server_mock_/list.json').then(async  res =>{
        //     if(res.ok){
        //         setList(await res.json())
        //     }
        // })
    },[useDebounceParam])
    useMount(() =>{
        fetch(`${apiUrl}/users`).then(async  res =>{
            if(res.ok){
                setUsers(await res.json())
            }
        })
    })
    return (<div>
        <SearchPanel param ={param} users={users} setParam ={setParam} list = {list}/>
        <List list={list} users={users}/>
    </div>)
}