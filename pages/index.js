import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Link from 'next/link'
import { startClock } from '../actions'
import { INCREMENT } from '../types'


const Index = () => {

  const state = useSelector((state) => state)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startClock())
  }, [dispatch])

  return (
    <>
    </>
  )
}

export default Index
