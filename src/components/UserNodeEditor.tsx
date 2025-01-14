"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { MapPinIcon } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { DateInput, DateSegment } from "react-aria-components";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const Map = dynamic(() => import("@/components/location-picker"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  ),
});

interface FamilyMemberData {
  id: string;
  name: string;
  code?: string;
  status: "Living" | "Deceased";
  birthDate?: string;
  deathDate?: string;
  year?: string;
  image?: string;
  location?: { lat: number; lng: number };
  fatherNodeId?: string;
  childrenNodeIds?: string[];
}

interface AdvancedNodeEditorProps {
  data: FamilyMemberData;
}

export function AdvancedNodeEditor({ data }: AdvancedNodeEditorProps) {
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState(data);
  const [activeTab, setActiveTab] = useState("details");

  const handleAddFather = () => {
    // Logic to add father node
    // This should be implemented in the parent component and passed down as a prop
    console.log("Add father node");
  };

  const handleAddChild = () => {
    // Logic to add child node
    // This should be implemented in the parent component and passed down as a prop
    console.log("Add child node");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
        <ScrollArea className="flex max-h-full flex-col">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="px-6 pt-6">Edit Family Member</DialogTitle>
            <DialogDescription asChild>
              <div className="flex flex-col gap-6 p-6 pt-3">
                <p className="w-11/12">
                  Make changes to the family member here. Click save when
                  you&aposre done.
                </p>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="relations">Relations</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details">
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={editedData.name}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="code">Code</Label>
                        <Input
                          id="code"
                          value={editedData.code ?? ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              code: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={editedData.status}
                          onValueChange={(value: "Living" | "Deceased") =>
                            setEditedData({ ...editedData, status: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Living">Living</SelectItem>
                            <SelectItem value="Deceased">Deceased</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="birthDate">Birth Date</Label>
                        <DateInput className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20">
                          {(segment) => (
                            <DateSegment
                              segment={segment}
                              className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
                            />
                          )}
                        </DateInput>
                        {/* <Calendar
                          mode="single"
                          selected={
                            editedData.birthDate
                              ? new Date(editedData.birthDate)
                              : undefined
                          }
                          onSelect={(date) =>
                            setEditedData({
                              ...editedData,
                              birthDate: date?.toISOString(),
                            })
                          }
                          className="rounded-md border"
                        /> */}
                      </div>
                      {editedData.status === "Deceased" && (
                        <div className="grid gap-2">
                          <Label htmlFor="deathDate">Date of Death</Label>
                          <DateInput className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20">
                          {(segment) => (
                            <DateSegment
                              segment={segment}
                              className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
                            />
                          )}
                        </DateInput>
                          {/* <Calendar
                            mode="single"
                            selected={
                              editedData.deathDate
                                ? new Date(editedData.deathDate)
                                : undefined
                            }
                            onSelect={(date) =>
                              setEditedData({
                                ...editedData,
                                deathDate: date?.toISOString(),
                              })
                            }
                            className="rounded-md border"
                          /> */}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="relations">
                    <div className="grid gap-4 py-4">
                      <Button
                        onClick={handleAddFather}
                        disabled={!!editedData.fatherNodeId}
                      >
                        Add Father
                      </Button>
                      <Button onClick={handleAddChild}>Add Child</Button>
                      {editedData.childrenNodeIds &&
                        editedData.childrenNodeIds.length > 0 && (
                          <div>
                            <Label>Children</Label>
                            <ul className="list-inside list-disc">
                              {editedData.childrenNodeIds.map((childId) => (
                                <li key={childId}>{childId}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  </TabsContent>
                  <TabsContent value="location">
                    <div className="grid gap-4 py-4">
                      <Label>Location</Label>
                      <div className="h-[300px]">
                        <Map
                          onLocationSelect={(lat: number, lng: number) =>
                            setEditedData({
                              ...editedData,
                              location: { lat, lng },
                            })
                          }
                        />
                        {/* {editedData.location && (
                          <MapPinIcon
                            className="text-red-500"
                            style={{
                              position: "absolute",
                              left: "50%",
                              top: "50%",
                              transform: "translate(-50%, -100%)",
                            }}
                          />
                        )} */}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <DialogFooter>
                  <Button onClick={() => setOpen(false)}>Save changes</Button>
                </DialogFooter>
              </div>
            </DialogDescription>
          </DialogHeader>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
