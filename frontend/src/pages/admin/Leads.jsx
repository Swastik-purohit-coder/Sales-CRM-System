import { useEffect, useState } from "react";

import leadService from "../../services/leadService";

import LeadTable from "../../components/leads/LeadTable";
import LeadFilters from "../../components/leads/LeadFilters";
import LeadFormModal from "../../components/leads/LeadFormModal";
import LeadAssignModal from "../../components/leads/LeadAssignModal";
import LeadStatusModal from "../../components/leads/LeadStatusModal";
import LeadDetailsDrawer from "../../components/leads/LeadDetailsDrawer";
import LeadLoadingSkeleton from "../../components/leads/LeadLoadingSkeleton";
import LeadEmptyState from "../../components/leads/LeadEmptyState";
import LeadPagination from "../../components/leads/LeadPagination";

const Leads = () => {

    const [loading, setLoading] = useState(true);

    const [leads, setLeads] = useState([]);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        search: "",
        status: "",
        priority: "",
    });

    const [selectedLead, setSelectedLead] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const [showAssign, setShowAssign] = useState(false);

    const [showStatus, setShowStatus] = useState(false);

    const [showDrawer, setShowDrawer] = useState(false);

    useEffect(() => {

        loadLeads();

    }, [page, filters]);

    const loadLeads = async () => {

        setLoading(true);

        try {

            const res =
                await leadService.getLeads({
                    page,
                    ...filters,
                });

            const data =
                res.data?.data || res.data;

            setLeads(data.leads || data);

            setTotalPages(
                data.totalPages || 1
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="page-container">

            <div className="page-header">

                <div>

                    <h1>

                        Lead Management

                    </h1>

                    <p>

                        Manage all sales leads.

                    </p>

                </div>

                <button
                    onClick={() => {

                        setSelectedLead(null);

                        setShowForm(true);

                    }}
                >

                    + Create Lead

                </button>

            </div>

            <LeadFilters
                filters={filters}
                setFilters={setFilters}
            />

            {loading ? (

                <LeadLoadingSkeleton />

            ) : leads.length === 0 ? (

                <LeadEmptyState />

            ) : (

                <>

                    <div className="table-container-responsive">

                        <LeadTable
                            leads={leads}
                            loading={loading}
                            onView={(lead) => {

                                setSelectedLead(lead);

                                setShowDrawer(true);

                            }}
                            onEdit={(lead) => {

                                setSelectedLead(lead);

                                setShowForm(true);

                            }}
                            onAssign={(lead) => {

                                setSelectedLead(lead);

                                setShowAssign(true);

                            }}
                            onStatus={(lead) => {

                                setSelectedLead(lead);

                                setShowStatus(true);

                            }}
                        />

                    </div>

                    <LeadPagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />

                </>

            )}

            <LeadFormModal
                open={showForm}
                close={() =>
                    setShowForm(false)
                }
                refresh={loadLeads}
                editLead={selectedLead}
            />

            <LeadAssignModal
                open={showAssign}
                close={() =>
                    setShowAssign(false)
                }
                lead={selectedLead}
                refresh={loadLeads}
            />

            <LeadStatusModal
                open={showStatus}
                close={() =>
                    setShowStatus(false)
                }
                lead={selectedLead}
                refresh={loadLeads}
            />

            <LeadDetailsDrawer
                open={showDrawer}
                close={() =>
                    setShowDrawer(false)
                }
                lead={selectedLead}
            />

        </div>

    );

};

export default Leads;