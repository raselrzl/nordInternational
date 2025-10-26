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
import { JonoprioNews, SorboseshNews } from "./homepageArticleList"

export function CrimeAndPopularTab() {
  return (
    <div className="p-2">
    <Tabs defaultValue="crime" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger className=" font-bold" value="crime">CRIME</TabsTrigger>
        <TabsTrigger className=" font-bold" value="jonoprio">POPULAR</TabsTrigger>
      </TabsList>
      <TabsContent value="crime">
        <Card className="rounded-xs">
          <CardContent className="space-y-2">
            <SorboseshNews />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="jonoprio">
        <Card>
          <CardContent className="space-y-2">
            <JonoprioNews />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs></div>
  )
}
