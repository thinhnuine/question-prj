"use client"
import {Card, Checkbox, Col, Row, Typography, Space, Pagination} from "antd"
import Link from "next/link"
import {QuestionType, useQuestionController} from "./controller"
import {CheckboxChangeEvent} from "antd/es/checkbox"

const {Title} = Typography
export default function Page() {
  const {data, page, setPage, limit, setLimit, total, handleUpdateStatus} = useQuestionController()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 md:p-5">
      <Title>Question</Title>
      <Row gutter={[16, 16]} className="w-full" justify="start" align="stretch">
        {data.map((item: QuestionType) => (
          <Col xs={24} md={12} lg={6} key={item?.question}>
            <Card className="shadow-lg border-1 border-white ">
              <Space size={20}>
                <Checkbox
                  checked={item?.isSolved}
                  onChange={(e: CheckboxChangeEvent) => handleUpdateStatus(e, item?.question)}
                />
                <Link legacyBehavior href={item?.link}>
                  <a target="_blank" rel="noopener noreferrer" className="text-lg whitespace-pre-wrap">
                    {item?.text}
                  </a>
                </Link>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        pageSize={limit}
        className="mt-5"
        total={total}
        current={page}
        onChange={(page, limit) => {
          setPage(page)
          setLimit(limit)
        }}
      />
    </main>
  )
}
