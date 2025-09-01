"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  User,
  AtSign,
  Users,
  TrendingUp,
  Globe,
  Mail,
  Sparkles,
  X,
  Save,
} from "lucide-react";
import { countries } from "@/constant/countries";
import { Platform } from "@prisma/client";
import { TInfluencer } from "@/types/influencer.types";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateInfluencer } from "@/service/influencer";
import { categories } from "@/constant/categories";
import { FormDataUpdate, formSchemaUpdate } from "@/schema/influencer.schema";

interface EditInfluencerFormProps {
  influencer: TInfluencer;
}

export default function EditInfluencerForm({
  influencer,
}: EditInfluencerFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormDataUpdate>({
    resolver: zodResolver(formSchemaUpdate),
    defaultValues: {
      name: influencer.name || "",
      platform: influencer.platform as Platform,
      username: influencer.username || "",
      email: influencer.email || "",
      followers: influencer.followers ? String(influencer.followers) : "",
      engagementRate: influencer?.engagement_rate
        ? String(influencer.engagement_rate)
        : "",
      country: influencer.country || "",
      categories: influencer.categories || [],
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    startTransition(async () => {
        const response = await updateInfluencer(influencer.id, {
          ...data,
          engagement_rate: Number(data.engagementRate),
        });

        if (response.success) {
          toast.success("Influencer updated successfully!");
          router.refresh();
          router.push("/dashboard");
        } else {
          toast.error(response.message || "Failed to update influencer");
        }
    });
  };

  const toggleCategory = (category: string, checked: boolean) => {
    const currentCategories = form.getValues("categories");
    if (checked) {
      form.setValue("categories", [...currentCategories, category]);
    } else {
      form.setValue(
        "categories",
        currentCategories.filter((c) => c !== category)
      );
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    const currentCategories = form.getValues("categories");
    form.setValue(
      "categories",
      currentCategories.filter((c) => c !== categoryToRemove)
    );
  };

  const selectedCategories = form.watch("categories");

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Influencer
          </h1>
          <p className="text-gray-600">
            Update the influencer&apos;s information
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="bg-white border border-gray-200 shadow-sm pt-0">
              <CardHeader className="bg-gray-100 py-2">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <User className="w-5 h-5" />
                  Basic Information
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Update the influencer&apos;s basic profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700">
                          <User className="w-4 h-4" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter full name"
                            className="border-2 focus:border-gray-400 transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700">
                          <Mail className="w-4 h-4" />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter email address"
                            type="email"
                            className="border-2 focus:border-gray-400 transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700">
                          <Globe className="w-4 h-4" />
                          Platform
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-2 focus:border-gray-400 transition-colors">
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(Platform).map((platform) => (
                              <SelectItem key={platform} value={platform}>
                                {platform.charAt(0) +
                                  platform.slice(1).toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700">
                          <AtSign className="w-4 h-4" />
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter username (without @)"
                            className="border-2 focus:border-gray-400 transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm pt-0">
              <CardHeader className="bg-gray-100 py-2">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <TrendingUp className="w-5 h-5" />
                  Metrics & Location
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Update performance metrics and location information
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="followers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700">
                          <Users className="w-4 h-4" />
                          Followers *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="Enter follower count"
                            className="border-2 focus:border-gray-400 transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="engagementRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700">
                          <TrendingUp className="w-4 h-4" />
                          Engagement Rate (%)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            min="0"
                            max="100"
                            placeholder="Enter engagement rate"
                            className="border-2 focus:border-gray-400 transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-gray-700">
                          <Globe className="w-4 h-4" />
                          Country *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-2 focus:border-gray-400 transition-colors">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[200px] overflow-y-auto">
                            {countries.map((country) => (
                              <SelectItem
                                key={country.code}
                                value={country.code}
                              >
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm pt-0">
              <CardHeader className="bg-gray-100 py-2">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Sparkles className="w-5 h-5" />
                  Content Categories
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Update the categories that best describe the influencer&apos;s
                  content
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="categories"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">
                        Select Categories *
                      </FormLabel>

                      {/* Selected Categories */}
                      {selectedCategories.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 font-medium">
                            Selected Categories:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedCategories.map((category) => (
                              <Badge
                                key={category}
                                variant="secondary"
                                className="bg-gray-100 text-gray-700 border border-gray-300 px-3 py-1"
                              >
                                {category}
                                <button
                                  type="button"
                                  onClick={() => removeCategory(category)}
                                  className="ml-2 hover:text-red-600 transition-colors"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Category Selection */}
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 font-medium">
                          Available Categories:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                          {categories
                            .filter(
                              (category) =>
                                !selectedCategories.includes(category)
                            )
                            .map((category) => (
                              <FormField
                                key={category}
                                control={form.control}
                                name="categories"
                                render={() => (
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={selectedCategories.includes(
                                          category
                                        )}
                                        onCheckedChange={(checked) =>
                                          toggleCategory(
                                            category,
                                            checked as boolean
                                          )
                                        }
                                        className="border-2 border-gray-400"
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm cursor-pointer hover:text-gray-800 transition-colors">
                                      {category}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                        </div>
                      </div>
                      <FormDescription>
                        Select at least one category that matches the
                        influencer&apos;s content
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4 pt-6">
              <Button
                type="submit"
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Update Influencer
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
