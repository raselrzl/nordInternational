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
    <div className="p-2 md:py-4">
    <Tabs defaultValue="crime" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="crime">CRIME</TabsTrigger>
        <TabsTrigger value="jonoprio">POPULAR</TabsTrigger>
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
