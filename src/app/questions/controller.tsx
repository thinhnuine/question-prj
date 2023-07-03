"use client"
import {apiPjc} from "@/common/open-api"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {CheckboxChangeEvent} from "antd/es/checkbox"
export type QuestionType = {
  link: string
  text: string
  question: string
  pattern: string
  comment: string
  isSolved: boolean
}

export const useQuestionController = () => {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(30)
  const [total, setTotal] = useState(0)

  const [data, setData] = useState<QuestionType[]>([])

  const getData = async () => {
    try {
      const response = await apiPjc.get(`/api/questions?limit=${limit}&page=${page}`)
      setData(response.data.data)
      setTotal(response.data.total)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit])

  const handleUpdateStatus = async (e: CheckboxChangeEvent, id: string) => {
    try {
      if (e.target.checked) {
        await apiPjc.patch("/api/questions", {
          id: id,
          status: true,
        })
      } else {
        await apiPjc.patch("/api/questions", {
          id: id,
          status: false,
        })
      }
      getData()
    } catch (error) {
      console.error(error)
    }
  }

  return {data, page, total, limit, setPage, setLimit, handleUpdateStatus}
}
