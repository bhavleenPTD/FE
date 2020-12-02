import React, { useState } from 'react';
import './image_upload.css';
import Dropzone from 'react-dropzone';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageUpload = ({ getImageUrl }) => {
	const [fileNames, setFileNames] = useState([]);
	const [imageUrl, setImageUrl] = useState('');
	const [imageFile, setImageFile] = useState('');
	const [formData, setFormData] = React.useState('');

	const handleDrop = (acceptedFiles) => {
		const imageFile = acceptedFiles.map((file) => file.name);
		setFileNames(imageFile);
		const file = acceptedFiles[0];
		let reader = new FileReader();
		setImageFile(file);
		console.log(file);

		reader.onloadend = () => {
			const base64String = reader.result
				.replace('data:', '')
				.replace(/^.+,/, '');
			localStorage.setItem('wallpaper', base64String);
			setImageUrl(`data:image/png;base64,${base64String}`);
		};
		reader.readAsDataURL(file);
	};

	const handleSave = () => {
		getImageUrl(imageFile);
	};

	const notify = () =>
		toast.error('Please upload an image to proceed !!! ', {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

	return (
		<React.Fragment>
			<h1>Upload Images</h1>
			<hr />
			<ToastContainer />
			<Dropzone
				onDrop={handleDrop}
				accept="image/*"
				minSize={1024}
				maxSize={3072000}
			>
				{({
					getRootProps,
					getInputProps,
					isDragActive,
					isDragAccept,
					isDragReject,
				}) => {
					const additionalClass = isDragAccept
						? 'accept'
						: isDragReject
						? 'reject'
						: '';

					return (
						<div
							{...getRootProps({
								className: `dropzone ${additionalClass}`,
							})}
						>
							<input {...getInputProps()} />
							<FontAwesomeIcon icon={faPlusSquare} size="9x" />
							<br />
							<span>{isDragActive ? '📂' : '📁'}</span>
							<h5>Drag & Drop images, or click to select files</h5>
						</div>
					);
				}}
			</Dropzone>

			<div style={{ marginLeft: '3rem', marginBottom: '1rem' }}>
				{imageUrl ? (
					<div>
						<h3>Preview</h3>
						<img
							src={imageUrl}
							width="900"
							height="500"
							alt=""
							style={{ border: '5px double gray' }}
						/>
					</div>
				) : (
					<div></div>
				)}
			</div>
			{imageUrl ? (
				<Link to="/image-details">
					<Button
						color="danger"
						className="btn-custom navbar-btn btn-rounded waves-effect waves-light"
						style={{ marginLeft: '29rem' }}
						onClick={handleSave}
					>
						Save
					</Button>
				</Link>
			) : (
				<Button
					color="danger"
					className="btn-custom navbar-btn btn-rounded waves-effect waves-light"
					style={{ marginLeft: '29rem' }}
					onClick={notify}
				>
					Save
				</Button>
			)}
		</React.Fragment>
	);
};

export default ImageUpload;
