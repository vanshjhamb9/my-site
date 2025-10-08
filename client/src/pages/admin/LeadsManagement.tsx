import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Lead, UpdateLead } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

type StatusType = "all" | "new" | "contacted" | "qualified" | "converted" | "closed" | "rejected";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  contacted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  qualified: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  converted: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  closed: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export default function LeadsManagement() {
  const [statusFilter, setStatusFilter] = useState<StatusType>("all");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const { toast } = useToast();

  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/admin/leads", statusFilter !== "all" ? `?status=${statusFilter}` : ""],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/leads/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      toast({
        title: "Success",
        description: "Lead deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete lead",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateLead }) => {
      await apiRequest("PATCH", `/api/admin/leads/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      setEditDialogOpen(false);
      toast({
        title: "Success",
        description: "Lead updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update lead",
        variant: "destructive",
      });
    },
  });

  const handleView = (lead: Lead) => {
    setSelectedLead(lead);
    setViewDialogOpen(true);
  };

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || "");
    setEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedLead) return;
    updateMutation.mutate({
      id: selectedLead.id,
      data: {
        status: editStatus,
        notes: editNotes,
        updatedAt: new Date(),
      },
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle data-testid="text-leads-title">Leads Management</CardTitle>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusType)}>
              <SelectTrigger className="w-[180px]" data-testid="select-status-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leads</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-12" data-testid="loader-leads">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-12 text-slate-500" data-testid="text-no-leads">
              No leads found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Business Needs</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} data-testid={`row-lead-${lead.id}`}>
                    <TableCell data-testid={`text-lead-name-${lead.id}`}>{lead.name}</TableCell>
                    <TableCell data-testid={`text-lead-email-${lead.id}`}>{lead.email}</TableCell>
                    <TableCell data-testid={`text-lead-business-${lead.id}`}>{lead.businessNeeds}</TableCell>
                    <TableCell>
                      <Badge
                        className={STATUS_COLORS[lead.status]}
                        data-testid={`badge-lead-status-${lead.id}`}
                      >
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell data-testid={`text-lead-date-${lead.id}`}>
                      {format(new Date(lead.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(lead)}
                          data-testid={`button-view-${lead.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(lead)}
                          data-testid={`button-edit-${lead.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(lead.id)}
                          data-testid={`button-delete-${lead.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent data-testid="dialog-view-lead">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <p className="text-sm text-slate-600 dark:text-slate-400" data-testid="text-view-name">
                  {selectedLead.name}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="text-sm text-slate-600 dark:text-slate-400" data-testid="text-view-email">
                  {selectedLead.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Business Needs</label>
                <p className="text-sm text-slate-600 dark:text-slate-400" data-testid="text-view-business">
                  {selectedLead.businessNeeds}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <p className="text-sm text-slate-600 dark:text-slate-400" data-testid="text-view-message">
                  {selectedLead.message || "No message"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Badge className={STATUS_COLORS[selectedLead.status]} data-testid="badge-view-status">
                  {selectedLead.status}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <p className="text-sm text-slate-600 dark:text-slate-400" data-testid="text-view-notes">
                  {selectedLead.notes || "No notes"}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent data-testid="dialog-edit-lead">
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
            <DialogDescription>Update lead status and notes</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger data-testid="select-edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Add notes about this lead..."
                  rows={4}
                  data-testid="textarea-edit-notes"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              data-testid="button-cancel-edit"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={updateMutation.isPending}
              data-testid="button-save-edit"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
