import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OpinionForm } from "./OpinionForm";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <Tabs
      defaultValue="ovijug"
      className="w-auto my-10 p-1"
    >
      <TabsContent value="ovijug">
        <Card className="min-h-[400px] rounded-none">
          <CardHeader>
            <OpinionForm />
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="samprotik">
        <Card className="min-h-[400px]">
          <CardHeader>
            <ContactForm />
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
