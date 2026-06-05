import CustomerFormModal from '@/Components/CustomerFormModal';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ customers }) {
    const [showFormModal, setShowFormModal] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [deletingCustomer, setDeletingCustomer] = useState(null);

    const { delete: destroy, processing } = useForm();

    const openCreateModal = () => {
        setEditingCustomer(null);
        setShowFormModal(true);
    };

    const openEditModal = (customer) => {
        setEditingCustomer(customer);
        setShowFormModal(true);
    };

    const closeFormModal = () => {
        setShowFormModal(false);
        setEditingCustomer(null);
    };

    const confirmDelete = (customer) => {
        setDeletingCustomer(customer);
    };

    const deleteCustomer = (e) => {
        e.preventDefault();

        destroy(route('customers.destroy', deletingCustomer.id), {
            preserveScroll: true,
            onSuccess: () => setDeletingCustomer(null),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Customers
                    </h2>
                    <PrimaryButton onClick={openCreateModal}>
                        Add Customer
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Phone
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Company
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {customers.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-8 text-center text-sm text-gray-500"
                                            >
                                                No customers yet. Click &quot;Add
                                                Customer&quot; to create one.
                                            </td>
                                        </tr>
                                    ) : (
                                        customers.map((customer) => (
                                            <tr key={customer.id}>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                    {customer.name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {customer.email}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {customer.phone || '—'}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {customer.company || '—'}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openEditModal(
                                                                customer,
                                                            )
                                                        }
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            confirmDelete(
                                                                customer,
                                                            )
                                                        }
                                                        className="ms-4 text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <CustomerFormModal
                show={showFormModal}
                onClose={closeFormModal}
                customer={editingCustomer}
            />

            <Modal
                show={deletingCustomer !== null}
                onClose={() => setDeletingCustomer(null)}
                maxWidth="sm"
            >
                <form onSubmit={deleteCustomer} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Delete Customer
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">
                        Are you sure you want to delete{' '}
                        <span className="font-medium">
                            {deletingCustomer?.name}
                        </span>
                        ? This action cannot be undone.
                    </p>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton
                            type="button"
                            onClick={() => setDeletingCustomer(null)}
                        >
                            Cancel
                        </SecondaryButton>
                        <DangerButton disabled={processing}>
                            Delete
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
