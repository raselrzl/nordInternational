import {
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function UserLinks() {
  return (
    <div className="flex flex-wrap justify-center space-x-2 p-2">
      <Link href="/alluseropinion">
        <Button variant="outline" className="flex items-center gap-2 mb-2">
          Complaints
        </Button>
      </Link>
      <Link href="/post-an-article">
        <Button variant="outline" className="flex items-center gap-2 mb-2">
          Write a News Article
        </Button>
      </Link>
      <Link href="/my-article">
        <Button variant="outline" className="flex items-center gap-2 mb-2">
          My Published News List
        </Button>
      </Link>
      <Link href="/alluseropinion/opiniontable">
        <Button variant="outline" className="flex items-center gap-2 mb-2">
          Manage All Complaints
        </Button>
      </Link>
      
      {/* Section 2 Links */}
      <Link href="/post-an-article/alaarticles">
        <Button variant="outline" className="flex items-center gap-2 mb-2">
          Manage All Articles
        </Button>
      </Link>
      <Link href="/post-an-article/post-advertisement">
        <Button variant="outline" className="flex items-center gap-2 mb-2">
          Post an Advertisement
        </Button>
      </Link>
      <Link href="/post-an-article/post-advertisement/alladvertise">
        <Button variant="outline" className="flex items-center gap-2 mb-2">
          Manage All Advertisements
        </Button>
      </Link>
      <Link href="/about/advertise/allcontactinfo">
        <Button variant="outline" className="flex items-center gap-2 mb-2">
          All Advertisement Requests
        </Button>
      </Link>
      <Link href="/post-an-article/post-a-video">
        <Button variant="outline" className="flex items-center gap-2 mb-2">
          Post a YouTube Video
        </Button>
      </Link>
      <Link href="/post-an-article/post-a-video/allvideos">
        <Button variant="outline" className="flex items-center gap-2 mb-2">
          Manage All Videos
        </Button>
      </Link>
      <Link href="/routeTrack">
        <Button variant="outline" className="flex items-center gap-2 mb-2">
          Dashboard
        </Button>
      </Link>
      <Link href="/post-an-article/allusers">
        <Button variant="outline" className="flex items-center gap-2 mb-2">
          <Users size={16} />
          All App Users
        </Button>
      </Link>
    </div>
  );
}
