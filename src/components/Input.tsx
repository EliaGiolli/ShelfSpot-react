import * as Label from '@radix-ui/react-label';
import { InputProps } from '../types/customProps';

const LabelDemo = ({className, handleInputChange, searchTerm}:InputProps) => (
	<div className="flex flex-wrap justify-center items-center gap-[15px] px-5">
		<Label.Root
			className="text-[15px] font-medium leading-[35px] text-gray-400"
			htmlFor="Book genre"
		>
			Type here the book genre
		</Label.Root>
		<input
			className="inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded
            bg-gray-50 hover:bg-amber-100 px-2.5 text-[15px] leading-none text-gray-900 shadow 
            shadow-gray-300 outline-amber-500 focus:shadow-gray-400 border-2 border-amber-200"
			type="text"
			id="Book Genre"
            value={searchTerm}
            onChange={handleInputChange}
		/>
	</div>
);

export default LabelDemo;