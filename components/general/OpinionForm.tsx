'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { submitOpinion } from '@/app/actions'; // server action
import { Loader2 } from 'lucide-react';

export const OpinionSchema = z.object({
name: z.string().min(1, 'Please enter your name'),
email: z.string().email('Please enter a valid email').optional(),
phone: z
  .string()
  .min(10, 'Phone number must be at least 10 digits')
  .max(15, 'Phone number can be at most 15 digits')
  .optional(),
opinion: z.string()
  .min(10, 'Please write a complaint of at least 10 characters')
  .max(300, 'Please write a complaint of up to 300 characters')
});


export function OpinionForm() {
  const form = useForm({
    resolver: zodResolver(OpinionSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      opinion: ''
    }
  });

  type OpinionData = {
    name: string;
    email?: string;
    phone?: string;
    opinion: string;
  };
  const [pending, setPending] = useState(false);

  async function onSubmit(data: z.infer<typeof OpinionSchema>) {
    try {
      setPending(true);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('opinion', data.opinion);
      if (data.email) formData.append('email', data.email);
      if (data.phone) formData.append('phone', data.phone);
  
      await submitOpinion(formData);
  
      toast.success('✅ Your complaint has been submitted successfully!');

      form.reset();
    } catch (error) {
      if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
        toast.error('❌ Something went wrong. Please try again.');
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Write Your Complaint</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} className="text-xs" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} className="text-xs" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} className="text-xs" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Opinion */}
          <FormField
            control={form.control}
            name="opinion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complaint</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your complaint here..."
                    className="resize-none text-xs"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={pending}>
          {pending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              Sending...
            </span>
          ) : (
            'Send'
          )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
