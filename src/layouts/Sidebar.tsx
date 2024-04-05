import {Home, Repeat, Library, Clapperboard, Divide, ChevronUp, ChevronDown, History, PlaySquare, Clock, ListVideo} from 'lucide-react'
import {Children, ElementType, ReactNode, useState} from 'react'
import {buttonStyles} from '../components/Button'
import {twMerge} from 'tailwind-merge'
import {Button} from '../components/Button'
import {playlists, subscriptions} from '../data/sidebar'
import {useSidebarContext} from '../context/SidebarContext'
import { PageHeaderFirstSection } from './PageHeader'

export function Sidebar() {
  const {isLargeOpen, isSmallOpen, close} = useSidebarContext()
  return (
    <>
      <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1
			 ${isLargeOpen ? 'lg:hidden' : 'lg:flex'}`}>
        <SmallSideBarItem Icon={Home} title="Home" url="/"></SmallSideBarItem>
        <SmallSideBarItem Icon={Repeat} title="Shorts" url="/shorts"></SmallSideBarItem>
        <SmallSideBarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions"></SmallSideBarItem>
        <SmallSideBarItem Icon={Library} title="Library" url="/library"></SmallSideBarItem>
      </aside>
			{
				isSmallOpen &&  <div onClick={close} className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"/>
			}
      <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2
			 ${isLargeOpen ? 'lg:flex' : 'lg:hidden'} ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}>
				
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
				<PageHeaderFirstSection/>	
				</div>
				<LargeSidebarSection>
          <LargeSidebarItem isActive IconOrImage={Home} title="Home" url="/"></LargeSidebarItem>
          <LargeSidebarItem IconOrImage={Clapperboard} title="Subscriptions" url="/subscriptions"></LargeSidebarItem>
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem IconOrImage={Library} title="Library" url="/library"></LargeSidebarItem>
          <LargeSidebarItem IconOrImage={History} title="History" url="/history"></LargeSidebarItem>
          <LargeSidebarItem IconOrImage={PlaySquare} title="Your Videos" url="/your-videos"></LargeSidebarItem>
          <LargeSidebarItem IconOrImage={Clock} title="Watch Later" url="/playlist?list=WL"></LargeSidebarItem>
          {playlists.map(playlist => (
            <LargeSidebarItem key={playlist.id} IconOrImage={ListVideo} title={playlist.name} url={`/playlist?list=${playlist.id}`}></LargeSidebarItem>
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscription">
          {subscriptions.map(subscription => (
            <LargeSidebarItem key={subscription.id} IconOrImage={subscription.imgUrl} title={subscription.channelName} url={`/@${subscription.id}`}></LargeSidebarItem>
          ))}
        </LargeSidebarSection>
      </aside>
    </>
  )
}

type SmallSideBarItemProps = {
  Icon: ElementType
  title: string
  url: string
}

type LargeSideBarItemProps = {
  IconOrImage: ElementType | string
  title: string
  url: string
  isActive?: boolean
}

type LargeSidebarSectionProps = {
  children: ReactNode
  title?: string
  visibleItemCount?: number
}

function SmallSideBarItem({Icon, title, url}: SmallSideBarItemProps) {
  return (
    <a href={url} className={twMerge(buttonStyles({variant: 'ghost'}), 'py-4 px-1 flex flex-col items-center rounded-lg gap-1')}>
      <Icon className="w-6 h-6"></Icon>
      <div className="text-sm">{title}</div>
    </a>
  )
}

function LargeSidebarSection({children, title, visibleItemCount = Number.POSITIVE_INFINITY}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenArray = Children.toArray(children).flat()
  const showExpandButton = childrenArray.length > visibleItemCount
  const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount)
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown
  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button variant="ghost" onClick={() => setIsExpanded(e => !e)} className="w-full flex items-center rounded-lg gap-4 p-3">
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? 'Show Less' : 'Show More'}</div>
        </Button>
      )}
    </div>
  )
}

function LargeSidebarItem({IconOrImage, title, url, isActive = false}: LargeSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(buttonStyles({variant: 'ghost'}), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? 'font-bold bg-neutral-100 hover:bg-secondary' : undefined}`)}
    >
      {typeof IconOrImage === 'string' ? <img src={IconOrImage} className="w-6 h-6 rounded-full" /> : <IconOrImage className="w-6 h-6"></IconOrImage>}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
    </a>
  )
}
