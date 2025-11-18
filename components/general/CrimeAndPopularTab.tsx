import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {JonoprioNews, SorboseshNews } from "./homepageArticleList"
import { EconomyNews } from "../NewsCategory/EconomyNews"

export function CrimeAndPopularTab() {
  return (
    <div className="">
    <Tabs defaultValue="crime" className="w-full border boder-gray-950/10 shadow-lg">
      <TabsList className="grid w-full grid-cols-3 bg-amber-800">
        <TabsTrigger className=" font-bold" value="crime">CRIME</TabsTrigger>
        <TabsTrigger className=" font-bold" value="politics">POLITICS</TabsTrigger>
        <TabsTrigger className=" font-bold" value="economy">ECONOMY</TabsTrigger>
      </TabsList>
      <TabsContent value="crime" className="">
 
          <CardContent className="space-y-1 px-1">
            <SorboseshNews />
          </CardContent>

      </TabsContent>
      <TabsContent value="politics">

          <CardContent className="space-y-1 px-1">
            <JonoprioNews />
          </CardContent>

      </TabsContent>


       <TabsContent value="economy">

          <CardContent className="space-y-1 px-1">
            <EconomyNews />
          </CardContent>

      </TabsContent>
    </Tabs></div>
  )
}
