import { Button } from "@/components/ui/button"
import {
  CardContent,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { PoliticsNews, Latest } from "./homepageArticleList"
import { EconomyNews } from "../NewsCategory/EconomyNews"

export function CrimeAndPopularTab() {
  return (
    <Tabs
      defaultValue="crime"
      className="w-full border shadow-lg"
    >
      <TabsList className="grid w-full grid-cols-3 bg-black rounded-none">
        <TabsTrigger
          value="crime"
          className="
            font-bold text-white
            data-[state=active]:bg-white
            data-[state=active]:text-black
            rounded-none
          "
        >
          CRIME
        </TabsTrigger>

        <TabsTrigger
          value="politics"
          className="
            font-bold text-white
            data-[state=active]:bg-white
            data-[state=active]:text-black
            rounded-none
          "
        >
          POLITICS
        </TabsTrigger>

        <TabsTrigger
          value="economy"
          className="
            font-bold text-white
            data-[state=active]:bg-white
            data-[state=active]:text-black
            rounded-none
          "
        >
          ECONOMY
        </TabsTrigger>
      </TabsList>

      <TabsContent value="crime">
        <CardContent className="space-y-1 px-1">
          <Latest />
        </CardContent>
      </TabsContent>

      <TabsContent value="politics">
        <CardContent className="space-y-1 px-1">
          <PoliticsNews />
        </CardContent>
      </TabsContent>

      <TabsContent value="economy">
        <CardContent className="space-y-1 px-1">
          <EconomyNews />
        </CardContent>
      </TabsContent>
    </Tabs>
  )
}
