import { Page } from '@/app/generated/prisma/client';
import { HiDocumentText } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type LibraryPagesProps = {
    items: Page[];
};
export default function LibraryPages({ items }: LibraryPagesProps) {
    const router = useRouter(); // access to next.js navigation controls

    // Map each item in the array data pulled from DB, into command items, to render
    const itemsArr = items.map((item, index) => {
        const title = item.title;

        return (
            <TableRow
                key={index}
                onClick={() => {
                    router.push(`/pages/${item.id}`);
                }}>
                <TableCell className="w-full font-medium">
                    <HiDocumentText size={23} />
                    {title}
                </TableCell>
            </TableRow>
        );
    });

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-25">Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>{itemsArr}</TableBody>
        </Table>
    );
}
