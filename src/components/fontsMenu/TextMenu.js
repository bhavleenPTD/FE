import React, { useState } from 'react';
import { useStore } from '../../zustandstore';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButtonDropdown,
	Input,
	Button,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
    Label,
} from 'reactstrap';

export default () => {
	const {
		annotations,
		setAnnotations,
		annotationId,
        setFontSize,
        strokeWidth,
        setStrokeWidth,
		fontSize,
	} = useStore();
	const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);

	const toggleDropDown2 = () => setDropdownOpen2(!dropdownOpen2);
	const [ann, setAnn] = useState(null);
	React.useEffect(() => {
		let val = annotations.find((ann, key) => ann.id == annotationId);

		setAnn(val);
	}, [annotations, annotationId]);

	const handleChange = (e) => {
		setFontSize(parseFloat(e.target.value));
		if (ann != null) {
			annotations.forEach((element) => {
				if (element.id == ann.id) {
					element.fontSize = parseFloat(e.target.value);
				}
			});
			setAnnotations([].concat(annotations));
		}
	};
	
    const handleChangeS = (e) => {
		setStrokeWidth(parseFloat(e.target.value));
		if (ann != null) {
			annotations.forEach((element) => {
				if (element.id == ann.id) {
					element.strokeWidth = parseFloat(e.target.value);
				}
			});
			setAnnotations([].concat(annotations));
		}
	};


	return (
		<div style={{ width: '400px' }} className="d-flex">
            <div key={0} style={{margin:"2px"}}>
			<InputGroup size="sm"  >
                <Label className="mt-1">Font Size</Label>
				<Input
					type="number"
					value={
						ann != null && ann.fontSize != null
							? ann.fontSize
							: parseFloat(fontSize)
					}
					onChange={handleChange}
				/>
				<InputGroupButtonDropdown
					addonType="append"
					isOpen={dropdownOpen}
                    toggle={toggleDropDown}
                    
				>
					<DropdownToggle caret></DropdownToggle>
					<DropdownMenu>
						<DropdownItem onClick={handleChange} value={10}>
							10
						</DropdownItem>
						<DropdownItem onClick={handleChange} value={20}>
							20
						</DropdownItem>
						<DropdownItem onClick={handleChange} value={30}>
							30
						</DropdownItem>
						<DropdownItem onClick={handleChange} value={40}>
							40
						</DropdownItem>
						<DropdownItem onClick={handleChange} value={50}>
							50
						</DropdownItem>
					</DropdownMenu>
				</InputGroupButtonDropdown>

			</InputGroup>
            </div>
            <div key={1} style={{margin:"2px"}}>
			<InputGroup size="sm" >
                <Label className="mt-1">Stroke Width</Label>
				<Input
					type="number"
					value={
						ann != null && ann.strokeWidth != null
							? ann.strokeWidth
							: parseFloat(strokeWidth)
					}
					onChange={handleChangeS}
				/>
				<InputGroupButtonDropdown
					addonType="append"
					isOpen={dropdownOpen2}
                    toggle={toggleDropDown2}
                   
				>
					<DropdownToggle caret ></DropdownToggle>
					<DropdownMenu>
						<DropdownItem onClick={handleChangeS} value={10}>
							10
						</DropdownItem>
						<DropdownItem onClick={handleChangeS} value={20}>
							20
						</DropdownItem>
						<DropdownItem onClick={handleChangeS} value={30}>
							30
						</DropdownItem>
						<DropdownItem onClick={handleChangeS} value={40}>
							40
						</DropdownItem>
						<DropdownItem onClick={handleChangeS} value={50}>
							50
						</DropdownItem>
					</DropdownMenu>
				</InputGroupButtonDropdown>

			</InputGroup>
            </div>
            

		</div>
	);
};
