'use client';

import { Clipboard, Table } from 'flowbite-react';

interface DynamicTableProps {
	readonly data?: object | null
}

export default function DynamicTable(props: DynamicTableProps) {
	const { data } = props;

	return (
		<div className='relative overflow-x-auto'>
			<Table hoverable>
				<Table.Head>
					<Table.HeadCell>
						<span className='sr-only'>Copy</span>
					</Table.HeadCell>
					<Table.HeadCell>Property</Table.HeadCell>
					<Table.HeadCell>Value</Table.HeadCell>
				</Table.Head>
				<Table.Body className='divide-y'>
					{data ? Object.entries(data).map(([key, value]) => (
						<Table.Row key={key} className='bg-white'>
							<Table.Cell>
								<div className='relative left-6'>
									<Clipboard.WithIcon valueToCopy={JSON.stringify({ [key]: value })} />
								</div>
							</Table.Cell>
							<Table.Cell>
								{key}
							</Table.Cell>
							<Table.Cell>
								<pre className='whitespace-pre-wrap text-sm'>
									{JSON.stringify(value, null, 2)}
								</pre>
							</Table.Cell>
						</Table.Row>
					)) : (
						<Table.Row className='bg-white'>
							<Table.Cell className='text-center' colSpan={3}>
								Loading...
							</Table.Cell>
						</Table.Row>
					)}
				</Table.Body>
			</Table>
		</div>
	)
}