import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export default function SkeletonSmallJobCard() {
  return (
    <Card className="w-full max-w-sm shadow-md rounded-3xl hover:shadow-lg cursor-pointer duration-300 ease-in-out">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-24 mb-1" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
      <CardFooter>
        
      </CardFooter>
    </Card>
  )
}