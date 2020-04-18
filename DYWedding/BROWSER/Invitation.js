DYWedding.Invitation = CLASS({

	preset : () => {
		return DIV;
	},

	params : () => {
		return {
			style : {
				onDisplayResize : (width, height) => {
					if (width > 800) {
						return {
							width : 'auto'
						};
					} else {
						return {
							width : width
						};
					}
				},
				backgroundColor : '#fff',
				color : '#fff'
			}
		};
	},
	
	init : (inner, self) => {
		
		self.append(DIV({
			style : {
				fontSize : 16,
				padding : 20
			},
			c : [
				DIV({
					style : {
						padding : '30px 0',
						backgroundColor : '#fff',
						color : '#000',
						fontSize : 15,
						fontWeight : 'bold',
						border : '3px solid #163a2c'
					},
					c : [DIV({
						c : [DIV({
							style : {
								flt : 'left',
								paddingLeft : 40
							},
							c : [SPAN({
								c : '신랑'
							}), SPAN({
								style : {
									marginLeft : 10
								},
								c : '심영재'
							})]
						}), DIV({
							style : {
								flt : 'right',
								paddingRight : 40,
								marginTop : -5
							},
							c : [A({
								href : 'tel:01098622026',
								c : IMG({
									style : { width : 20 },
									src : DYWedding.R('phone.png')
								})
							}), A({
								style : {
									marginLeft : 20
								},
								href : 'sms:01098622026',
								c : IMG({
									style : { width : 20 },
									src : DYWedding.R('sms.png')
								})
							})]
						}), CLEAR_BOTH()]
					}),
					DIV({
						style : {
							marginTop : 30,
							marginBottom : 40
						},
						c : [DIV({
							style : {
								flt : 'left',
								paddingLeft : 40
							},
							c : [SPAN({
								c : '신부'
							}), SPAN({
								style : {
									marginLeft : 10
								},
								c : '황다솜'
							})]
						}), DIV({
							style : {
								flt : 'right',
								paddingRight : 40,
								marginTop : -5
							},
							c : [A({
								href : 'tel:01033909459',
								c : IMG({
									style : { width : 20 },
									src : DYWedding.R('phone.png')
								})
							}), A({
								style : {
									marginLeft : 20
								},
								href : 'sms:01033909459',
								c : IMG({
									style : { width : 20 },
									src : DYWedding.R('sms.png')
								})
							})]
						}), CLEAR_BOTH()]
					}),
					DIV({
						style : {
							flt : 'left',
							width : '50%',
							textAlign : 'center'
						},
						c : [H5({
							style : {
								fontWeight : 'bold',
								fontSize : 13
							},
							c : '신랑측 혼주'
						}), DIV({
							style : {
								marginTop : 30
							},
							c : [SPAN({style: {fontSize: 13}, c: '아버지'}), ' 심성우']
						}), DIV({
							style : {
								marginTop : 15
							},
							c : [A({
								href : 'tel:01031523660',
								c : IMG({
									style : { width : 20 },
									src : DYWedding.R('phone.png')
								})
							}), A({
								style : {
									marginLeft : 20
								},
								href : 'sms:01031523660',
								c : IMG({
									style : { width : 20 },
									src : DYWedding.R('sms.png')
								})
							})]
						}), DIV({
							style : {
								marginTop : 20
							},
							c : [SPAN({style: {fontSize: 13}, c: '어머니'}), ' 노연옥']
						}), DIV({
							style : {
								marginTop : 15
							},
							c : [A({
								href : 'tel:01056521147',
								c : IMG({
									style : { width : 20 },
									src : DYWedding.R('phone.png')
								})
							}), A({
								style : {
									marginLeft : 20
								},
								href : 'sms:01056521147',
								c : IMG({
									style : { width : 20 },
									src : DYWedding.R('sms.png')
								})
							})]
						})]
					}),
					DIV({
						style : {
							flt : 'left',
							width : '50%',
							textAlign : 'center'
						},
						c : [H5({
							style : {
								fontWeight : 'bold',
								fontSize : 13
							},
							c : '신부측 혼주'
						}), DIV({
							style : {
								marginTop : 30
							},
							c : [SPAN({style: {fontSize: 13}, c: '아버지'}), ' 황인효']
						}), DIV({
							style : {
								marginTop : 15
							},
							c : [A({
								href : 'tel:01066190722',
								c : IMG({
									style : { width : 20 },
									src : DYWedding.R('phone.png')
								})
							}), A({
								style : {
									marginLeft : 20
								},
								href : 'sms:01066190722',
								c : IMG({
									style : { width : 20 },
									src : DYWedding.R('sms.png')
								})
							})]
						}), DIV({
							style : {
								marginTop : 20
							},
							c : [SPAN({style: {fontSize: 13}, c: '어머니'}), ' 정정미']
						}), DIV({
							style : {
								marginTop : 15
							},
							c : [A({
								href : 'tel:01084060722',
								c : IMG({
									style : { width : 20 },
									src : DYWedding.R('phone.png')
								})
							}), A({
								style : {
									marginLeft : 20
								},
								href : 'sms:01084060722',
								c : IMG({
									style : { width : 20 },
									src : DYWedding.R('sms.png')
								})
							})]
						})]
					}), CLEAR_BOTH()]
				})
			]
		}));
	}
});
