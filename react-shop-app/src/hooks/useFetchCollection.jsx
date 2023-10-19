'use client'
import { db } from '@/firebase/firebase';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { toast } from 'react-toastify';

const useFetchCollection = (collectionName) => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCollection = useCallback(() => {
    setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy('createdAt', 'desc'));

      onSnapshot(q, (snapshot)=>{
        const allData = snapshot.docs.map((doc)=>({
          id: doc.id,
          ...doc.data()
        }))

        // console.log('allData', allData);
        setData(allData);
        setIsLoading(false);
      })
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }, [collectionName])

  useEffect(()=>{
    getCollection();
  }, [getCollection])
  
  return { data, isLoading }
}

export default useFetchCollection