import React from 'react'
import { useEffect, useState } from 'react';
//for data import
import * as Data from'../../api/data'
import * as localData from '../../api/localHostData';
import * as v9_firestore from '../../api/v9_firestore';
import * as v9_auth from '../../api/v9_auth';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import  Modal  from '../../AppComponents/Modal';
const Random = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
      setShowModal(prev => !prev);
  };

  const [tasks, setTasks]=useState([])
  const [showAddTask, setShowAddTask]=useState(false)

  //Extract Data
  const [data, setData]=useState({hits:[]})
  const [query, setQuery]=useState('redux')
  

  //Extract Data
  const [bookResults, setBookResults]=useState([])
  const [bookQuery, setBookQuery]=useState('Les')
  const [bookQueryType, setBookQueryType]=useState('include')

  const [bookTitle, setBookTitle]=useState("The Midnight Sun");
  const [bookAuthor, setBookAuthor]=useState("James")
  const [bookPrice, setBookPrice]=useState(5);

  const [books, setBooks]=useState([])



  useEffect(()=>{

    v9_firestore.db_getbooks(
      (books)=>{setBooks(books)},
      (e)=>{console.log(e)}
    );
    // v9_firestore.db_addbooks({title:'2', author:'M', price:7},
    //   (item)=>console.log(item),
    //   (err)=>console.log(err)
    // )
    const unSubscribe_SnapShotbooks= v9_firestore.db_onSnapShotbooks(setBooks,
      ()=>{}
    )
    const abordCont=new AbortController();
    localData.db_local_task_promise_fetch(setTasks, (err)=>{console.log(err)},abordCont)
    return ()=> {
      console.log("Safely Aborted")
      abordCont.abort();
      if (typeof  unSubscribe_SnapShotbooks === 'function') {
        unSubscribe_SnapShotbooks()
      }
    }
  },[]);
  const addBook=(title, author, price)=>{
    v9_firestore.db_addbooks({title:title, author:author, price:price},
      (item)=>console.log(item),
      (err)=>console.log(err)
    )
    setBookTitle('');
    setBookAuthor('');
    setBookPrice(0);
}



//When query Changes
useEffect(()=>{
Data.db_algolia_promise_fetch(query, setData, (err)=>{console.log(err)})
},[query]);

useEffect(()=>{
const unSubscribe_Querybooks=v9_firestore.db_querybooks(bookQuery,bookQueryType,setBookResults,(e)=>{console.log(e)})
return ()=> {
  console.log("Safely Aborted")
  //unSubscribe_Querybooks()
  console.log("unSubscribe_Querybooks", typeof unSubscribe_Querybooks, unSubscribe_Querybooks)
  if (unSubscribe_Querybooks=== 'function') {
    unSubscribe_Querybooks()
  }
}

},[bookQuery]);

const deleteBook=(book)=>{
 v9_firestore.db_deletebooks(books[books.length-1]);
};

const addTask=(task)=>{
let tempTask=tasks.sort((b,a)=>b.id-a.id)
let new_Task={...task,id:parseInt(tempTask[tempTask.length-1].id)+1};
console.log(new_Task)
localData.db_local_task_async_add(new_Task)
setTasks((prev)=>{
  return [...prev, {...new_Task}]
});
}

const nameFun='Brad2'
  return (
    <div>Random
        <Header 
          title={nameFun} 
          showAddTask={showAddTask} 
          openForm={()=>{
            setShowAddTask(!showAddTask)
            addBook()
          }}
          setShowModal={()=>{
            console.log("clicked")
            openModal()}}
        />
        <Modal showModal={showModal} setShowModal={setShowModal} />
        <Footer/>
        <input 
          type="text" 
          value={query}
          onChange={(event)=>{
            //console.log(event.target.value)
            setQuery(event.target.value)}}/>
        <ul>
          {data.hits.map((item)=>{

            if(item.title!==null){
              return(
                <li className='task' key={item.objectID}>
                  <a href={item.url} target="_blank">{item.title}</a>
                </li>
                )
            }

          })}
        </ul>
          {/* Playing with queries*/}
        <div>
          <label>
            title:
            <input 
            type="text" 
            value={bookTitle}
            onChange={(event)=>{
              //console.log(event.target.value)
              setBookTitle(event.target.value)}}/>
          </label>
          <label>
            author:
            <input 
            type="text" 
            value={bookAuthor}
            onChange={(event)=>{
              //console.log(event.target.value)
              setBookAuthor(event.target.value)}}/>
          </label>
          <label>
            price:
            <input 
            type="text" 
            value={bookPrice}
            onChange={(event)=>{
              //console.log(event.target.value)
              setBookPrice(event.target.value)}}/>
          </label>
          <button
            onClick={()=>{addBook(bookTitle, bookAuthor, bookPrice)}}
          >
            Create
          </button>
        </div>

        <label>
          Search:
          <input 
          type="text" 
          value={bookQuery}
          onChange={(event)=>{
            //console.log(event.target.value)
            setBookQuery(event.target.value)}}/>
        </label>

        <ul>
          {bookResults.map((item)=>{

            if(item.title!==null){
              return(
                <li className='task' key={item.id}>
                  <a  target="_blank" onDoubleClick={()=>{deleteBook(item)}}>{item.title}</a>
                </li>
                )
            }

          })}
        </ul>


    </div>
  )
}

export default Random