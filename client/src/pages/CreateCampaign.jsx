import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from "ethers";

import { money } from "../assets"
import { CustomButton, FormField } from '../components';
import { checkIfImage } from "../utils";


const CreateCampaign = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false)
	const [form, setForm] = useState({
		name: '',
		title: "",
		desc: "",
		target: "",
		deadline: "",
		image: ""
	});

	const handleSubmit =() => {

	}

	return (
		<div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
			{isLoading && "Loading..."}
			<div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] cursor-pointer'>
				<h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px]'>Start a Campaign</h1>
			</div>

			<form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
				<div className='flex flex-wrap gap-[40px]'>
					<FormField 
						labelName = "Your Name *"
						placeholder = "John Doe"
						type = "text"
						value = {form.name}
					/>
					<FormField 
						labelName = "Campaign Title *"
						placeholder = "Write a title"
						type = "text"
						value = {form.title}
					/>
					<FormField 
						labelName = "Story *"
						placeholder = "Write you story"
						isTextArea
						value = {form.desc}
					/>

					<div className='flex'>
						<img src={money} alt={money} className='w-[30px] h-[30px] object-contain mr-[20px]' />
						<h4 className='font-epilogue pt-[10px] text-gray-500' >You will get 100% of the raised amount </h4>
					</div>
				</div>
			</form>
		</div>
	)
}

export default CreateCampaign