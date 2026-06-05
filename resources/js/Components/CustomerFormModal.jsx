import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

const emptyForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
};

export default function CustomerFormModal({
    show,
    onClose,
    customer = null,
}) {
    const isEditing = customer !== null;

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm(emptyForm);

    useEffect(() => {
        if (!show) {
            return;
        }

        clearErrors();

        if (isEditing) {
            setData({
                name: customer.name ?? '',
                email: customer.email ?? '',
                phone: customer.phone ?? '',
                company: customer.company ?? '',
                address: customer.address ?? '',
            });
        } else {
            reset();
        }
    }, [show, customer]);

    const submit = (e) => {
        e.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        };

        if (isEditing) {
            put(route('customers.update', customer.id), options);
        } else {
            post(route('customers.store'), options);
        }
    };

    const close = () => {
        clearErrors();
        reset();
        onClose();
    };

    return (
        <Modal show={show} onClose={close} maxWidth="lg">
            <form onSubmit={submit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    {isEditing ? 'Edit Customer' : 'Add Customer'}
                </h2>

                <div className="mt-6 space-y-4">
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="phone" value="Phone" />
                        <TextInput
                            id="phone"
                            className="mt-1 block w-full"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="company" value="Company" />
                        <TextInput
                            id="company"
                            className="mt-1 block w-full"
                            value={data.company}
                            onChange={(e) => setData('company', e.target.value)}
                        />
                        <InputError message={errors.company} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="address" value="Address" />
                        <textarea
                            id="address"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            rows="3"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                        />
                        <InputError message={errors.address} className="mt-2" />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <SecondaryButton type="button" onClick={close}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton disabled={processing}>
                        {isEditing ? 'Update' : 'Save'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
