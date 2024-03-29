import {PageHeader} from './layouts/PageHeader'
import {CategoryPills} from './components/CategoryPills'
import {VideoGridItem} from './components/VideoGridItem'
import {categories, videos} from './data/home'
import {useState} from 'react'
import { Sidebar } from './layouts/Sidebar'
export default function APP() {
  const [selectedCategroy, setSelectedCategroy] = useState(categories[0])
  return (
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <Sidebar></Sidebar>
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryPills selectedCategroy={selectedCategroy} onSelect={setSelectedCategroy} categories={categories} />
          </div>
          {/* Note: repeat(auto-fill,minmax(300px,1fr)) just make sure that there are no spaces in the declaration*/}
          {/* error: repeat(auto-fill, minmax(300px, 1fr)) if space is in there, css must not be show correctly*/}
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {videos.map(video => (
              <VideoGridItem key={video.id} {...video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
