'use client'
import React, { FC, useState } from "react"
import Heading from "./utils/Heading"

interface Props { }

const Page: FC<Props> = (props) => {
  return (
    <div>
      <Heading title="LMS- school management system" description="school management system" keywords="school, management, system" />
    </div>
  )
}

export default Page;