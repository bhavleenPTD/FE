import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import useStore from '../../zustandstore';

const SortableItem = SortableElement(({ region, sortIndex, onRemove }) => {
	return (
		<div
			className="region"
			style={{
				boxShadow: `0 0 5px ${region.color}`,
				border: `1px solid ${region.color}`,
			}}
		>
			{console.log('list', region)}
			Region #{region.id}
			<button
				onClick={() => {
					onRemove(sortIndex);
				}}
			>
				Delete
			</button>
		</div>
	);
});

const SortableList = SortableContainer(({ items, onRemove }) => {
	return (
		<div className="regions-list">
			{items.map((region, index) => (
				<SortableItem
					key={`item-${region.id}`}
					index={index}
					region={region}
					onRemove={onRemove}
					sortIndex={index}
				/>
			))}
		</div>
	);
});

export default () => {
	const annotations = useStore((s) => s.annotations);
	const setAnnotations = useStore((s) => s.setAnnotations);

	return (
		<SortableList
			items={annotations}
			onSortEnd={({ oldIndex, newIndex }) => {
				setAnnotations(arrayMove(annotations, oldIndex, newIndex));
			}}
			onRemove={(index) => {
				annotations.splice(index, 1);
				setAnnotations(annotations.concat());
			}}
		/>
	);
};
