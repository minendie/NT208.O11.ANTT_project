import introImage from '../../assets/image.png'
import avatarPartner from '../../assets/logo-4.png'
import logoAITool from '../../assets/logo-5.svg'
import dotTextureBottomLeft from '../../assets/pattern-dot-1.svg'
import logoSearch from '../../assets/logo-6.svg'
import logoWrite from '../../assets/logo-7.svg'
import verticalOrnament from '../../assets/ornament-83-1.png'
import dotTextureTopRight from '../../assets/pattern-dot-2.svg'
import introBackground from '../../assets/rectangle-8.svg'
import verticalSeparator from '../../assets/separator-1.svg'
import partnerBackground from '../../assets/unsplash-6vhpy27jdps.png'
import offerBackground from '../../assets/unsplash-9d0ln17mdeu.png'
import firstStrength from '../../assets/unsplash-ph4skrfgyy.png'
import secondStrength from '../../assets/unsplash-eq2z9ay9wws.png'
import thirdStrength from '../../assets/unsplash-4ebhbxxckru.png'
import fourthStrength from '../../assets/unsplash-jibmsms4-ka.png'
import fifthStrength from '../../assets/unsplash-fhnnjk1yj7y.png'



const Aboutus = (): JSX.Element => {
  return (
    <div className="relative w-[98vw] h-[515vh]">
      {/* Partners */}
      <div className="absolute w-[98vw] h-[100vh] top-[420vh] left-0 overflow-hidden">
        <div className="relative h-[695px]">
          <div className="inline-flex flex-col items-start gap-[10px] absolute top-0 left-0">
            <img
              className="relative w-[98vw] h-[90vh] object-cover"
              alt="Unsplash"
              src={partnerBackground}
            />
            <div className="absolute w-[521px] h-[483px] top-0 left-0 rotate-[180.00deg]">
              <img className="absolute w-[370px] h-[340px] top-0 left-0 !h-[483px] !rotate-[-180.00deg] !w-[521px]" 
                   alt="Pattern dot" 
                   src={dotTextureBottomLeft} 
              />
            </div>
          </div>
          <div className="inline-flex items-start w-[98vw] gap-[30px] p-[10px] absolute top-[125px] left-0"
              style={{justifyContent: 'center'}}
          >
            {/* ElementPartner */}
            <div className="flex flex-col w-[20vw] items-center gap-[15px] px-[10px] py-[20px] relative bg-[#d9d9d9] rounded-[8px]">
              <div className="inline-flex items-center gap-[10px] relative flex-[0_0_auto]">
                <div className="flex w-[10vw] h-[10vw] items-center gap-[10px] relative">
                  <img className="relative flex-1 self-stretch grow object-cover" alt="Logo" src={avatarPartner} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-[5px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex items-center gap-[10px] px-0 py-[5px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative flex-1 mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-black text-[20px] text-center tracking-[0] leading-[normal]">
                  Partner 1
                  </div>
                </div>
                <div className="flex items-center gap-[10px] px-[5px] py-0 relative self-stretch w-full flex-[0_0_auto]">
                  <p className="relative flex-1 mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-[12px] text-justify tracking-[0] leading-[normal]">
                    Lorem ipsum dolor sit amet consectetur. Pellentesque mollis amet venenatis at accumsan purus. Lorem volutpat
                    donec turpis a eros sodales. Sit consectetur scelerisque tempor
                  </p>
                </div>
                <div className="flex items-center gap-[10px] px-0 py-[10px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative flex-1 mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-[15px] text-center tracking-[0] leading-[normal]">
                    Website
                  </div>
                </div>
              </div>
            </div>
            {/* ElementPartner */}
            <div className="flex flex-col w-[20vw] items-center gap-[15px] px-[10px] py-[20px] relative bg-[#d9d9d9] rounded-[8px]">
              <div className="inline-flex items-center gap-[10px] relative flex-[0_0_auto]">
                <div className="flex w-[10vw] h-[10vw] items-center gap-[10px] relative">
                  <img className="relative flex-1 self-stretch grow object-cover" alt="Logo" src={avatarPartner} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-[5px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex items-center gap-[10px] px-0 py-[5px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative flex-1 mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-black text-[20px] text-center tracking-[0] leading-[normal]">
                  Partner 2
                  </div>
                </div>
                <div className="flex items-center gap-[10px] px-[5px] py-0 relative self-stretch w-full flex-[0_0_auto]">
                  <p className="relative flex-1 mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-[12px] text-justify tracking-[0] leading-[normal]">
                    Lorem ipsum dolor sit amet consectetur. Pellentesque mollis amet venenatis at accumsan purus. Lorem volutpat
                    donec turpis a eros sodales. Sit consectetur scelerisque tempor
                  </p>
                </div>
                <div className="flex items-center gap-[10px] px-0 py-[10px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative flex-1 mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-[15px] text-center tracking-[0] leading-[normal]">
                    Website
                  </div>
                </div>
              </div>
            </div>
            {/* ElementPartner */}
            <div className="flex flex-col w-[20vw] items-center gap-[15px] px-[10px] py-[20px] relative bg-[#d9d9d9] rounded-[8px]">
              <div className="inline-flex items-center gap-[10px] relative flex-[0_0_auto]">
                <div className="flex w-[10vw] h-[10vw] items-center gap-[10px] relative">
                  <img className="relative flex-1 self-stretch grow object-cover" alt="Logo" src={avatarPartner} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-[5px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex items-center gap-[10px] px-0 py-[5px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative flex-1 mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-black text-[20px] text-center tracking-[0] leading-[normal]">
                  Partner 3
                  </div>
                </div>
                <div className="flex items-center gap-[10px] px-[5px] py-0 relative self-stretch w-full flex-[0_0_auto]">
                  <p className="relative flex-1 mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-[12px] text-justify tracking-[0] leading-[normal]">
                    Lorem ipsum dolor sit amet consectetur. Pellentesque mollis amet venenatis at accumsan purus. Lorem volutpat
                    donec turpis a eros sodales. Sit consectetur scelerisque tempor
                  </p>
                </div>
                <div className="flex items-center gap-[10px] px-0 py-[10px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative flex-1 mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-[15px] text-center tracking-[0] leading-[normal]">
                    Website
                  </div>
                </div>
              </div>
            </div>
            {/* ElementPartner */}
            <div className="flex flex-col w-[20vw] items-center gap-[15px] px-[10px] py-[20px] relative bg-[#d9d9d9] rounded-[8px]">
              <div className="inline-flex items-center gap-[10px] relative flex-[0_0_auto]">
                <div className="flex w-[10vw] h-[10vw] items-center gap-[10px] relative">
                  <img className="relative flex-1 self-stretch grow object-cover" alt="Logo" src={avatarPartner} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-[5px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex items-center gap-[10px] px-0 py-[5px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative flex-1 mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-black text-[20px] text-center tracking-[0] leading-[normal]">
                  Partner 4
                  </div>
                </div>
                <div className="flex items-center gap-[10px] px-[5px] py-0 relative self-stretch w-full flex-[0_0_auto]">
                  <p className="relative flex-1 mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-[12px] text-justify tracking-[0] leading-[normal]">
                    Lorem ipsum dolor sit amet consectetur. Pellentesque mollis amet venenatis at accumsan purus. Lorem volutpat
                    donec turpis a eros sodales. Sit consectetur scelerisque tempor
                  </p>
                </div>
                <div className="flex items-center gap-[10px] px-0 py-[10px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative flex-1 mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-black text-[15px] text-center tracking-[0] leading-[normal]">
                    Website
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute w-[98vw] h-[100px] top-[50px] [text-shadow:0px_4px_4px_#00000040] text-[#614bc3] text-[54px] text-center leading-[30px] [font-family:'Inter',Helvetica] font-bold tracking-[0]"
               style={{textAlign: 'center'}}
          >
            Our partners
          </div>
        </div>
      </div>
      {/* Why choose us? (Strengths) */}
      <div className="inline-flex w-[98vw] h-[90vh] items-start gap-[10px] absolute top-[180vh] -left-px"
           style={{justifyContent: 'center'}}
      >
        <div className="inline-flex items-start relative flex-[0_0_auto]">
          <div className="relative w-[10vw]">
            <div className="relative w-[10vw]">
              <div className="absolute w-[10vw] h-[1214px] top-0 left-0">
                <img 
                  className="absolute w-[10vw] h-[405px] top-0 left-0" 
                  alt="Ornament" 
                  src={verticalOrnament} />
                <img
                  className="absolute w-[10vw] h-[405px] top-[405px] left-0"
                  alt="Ornament"
                  src={verticalOrnament}
                />
                <img
                  className="absolute w-[10vw] h-[405px] top-[809px] left-0"
                  alt="Ornament"
                  src={verticalOrnament}
                />
              </div>
              <img
                className="absolute w-[10vw] h-[405px] top-[1057px] left-0"
                alt="Ornament"
                src={verticalOrnament}
              />
            </div>
          </div>
          <div className="relative w-[78vw]" />
          <div className="relative w-[10vw]">
            <div className="relative w-[10vw] h-[1461px]">
              <div className="absolute w-[10vw] h-[1214px] top-0 left-0">
                <img className="absolute w-[10vw] h-[405px] top-0 left-0" 
                alt="Ornament" 
                src={verticalOrnament} />
                <img
                  className="absolute w-[10vw] h-[405px] top-[405px] left-0"
                  alt="Ornament"
                  src={verticalOrnament}
                />
                <img
                  className="absolute w-[10vw] h-[405px] top-[809px] left-0"
                  alt="Ornament"
                  src={verticalOrnament}
                />
              </div>
              <img
                className="absolute w-[10vw] h-[405px] top-[1057px] left-0"
                alt="Ornament"
                src={verticalOrnament}
              />
            </div>
          </div>
        </div>
        <div className="inline-flex flex-col w-[78vw] h-[240vh] items-center gap-[30px] bg-[#33bbc5] absolute top-0 left-[10vw]">
          <div className="relative w-[78vw] mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] text-white text-[100px] text-center leading-[normal] [font-family:'Inter',Helvetica] font-bold tracking-[0]">
            Why choose us?
          </div>
          <div className="inline-flex flex-col w-[78vw] items-end relative flex-[0_0_auto]">
            <div className="flex w-[77vw] items-center gap-[20px] relative flex-[0_0_auto]">
              <div className="w-[50vw] p-[10px] flex-1 grow flex items-center justify-center gap-[10px] relative">
                <p className="w-[50vw] mt-[-1.00px] ml-[-3.50px] mr-[-3.50px] text-white text-[22px] relative [font-family:'Inter',Helvetica] font-normal text-justify tracking-[0] leading-[normal]">
                  Lorem ipsum dolor sit amet consectetur. Pellentesque mollis amet venenatis at accumsan purus. Lorem
                  volutpat donec turpis a eros sodales. Sit consectetur scelerisque tempor commodo orci tincidunt
                  lectus. Tincidunt sed molestie ut sed.
                </p>
              </div>
              <div className="items-start inline-flex gap-[10px] relative flex-[0_0_auto]">
                <img className="relative w-[20vw] h-[20vw]" alt="Unsplash" src={firstStrength} />
              </div>
            </div>
            <div className="flex w-[77w] items-center gap-[20px] relative flex-[0_0_auto]">
              <div className="items-center inline-flex gap-[10px] relative flex-[0_0_auto]">
                <img className="relative w-[20vw] h-[20vw]" alt="Unsplash" src={secondStrength} />
              </div>
              <div className="w-[50vw] p-[10px] flex-1 grow flex items-center justify-center gap-[10px] relative">
                <p className="w-[50vw] relative flex-1 self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-white text-[22px] text-justify tracking-[0] leading-[normal]">
                  Lorem ipsum dolor sit amet consectetur. Pellentesque mollis amet venenatis at accumsan purus. Lorem
                  volutpat donec turpis a eros sodales. Sit consectetur scelerisque tempor commodo orci tincidunt
                  lectus. Tincidunt sed molestie ut sed.
                </p>
              </div>
            </div>
            <div className="flex w-[77vw] items-center gap-[20px] relative flex-[0_0_auto]">
              <div className="w-[50vw] flex-1 grow flex items-center justify-center gap-[10px] relative">
                <p className="w-[50vw] mt-[-1.00px] ml-[-5.00px] mr-[-5.00px] text-white text-[22px] relative [font-family:'Inter',Helvetica] font-normal text-justify tracking-[0] leading-[normal]">
                  Lorem ipsum dolor sit amet consectetur. Pellentesque mollis amet venenatis at accumsan purus. Lorem
                  volutpat donec turpis a eros sodales. Sit consectetur scelerisque tempor commodo orci tincidunt
                  lectus. Tincidunt sed molestie ut sed.
                </p>
              </div>
              <div className="items-start inline-flex gap-[10px] relative flex-[0_0_auto]">
                <img className="relative w-[20vw] h-[20vw]" alt="Unsplash" src={thirdStrength} />
              </div>
            </div>
            <div className="flex w-[77vw] items-center gap-[20px] relative flex-[0_0_auto]">
              <div className="items-center inline-flex gap-[10px] relative flex-[0_0_auto]">
                <img
                  className="relative w-[20vw] h-[20vw]"
                  alt="Unsplash ka"
                  src={fourthStrength}
                />
              </div>
              <div className="w-[50vw] p-[10px] flex-1 grow flex items-center justify-center gap-[10px] relative">
                <p className="w-[50vw] relative flex-1 self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-white text-[22px] text-justify tracking-[0] leading-[normal]">
                  Lorem ipsum dolor sit amet consectetur. Pellentesque mollis amet venenatis at accumsan purus. Lorem
                  volutpat donec turpis a eros sodales. Sit consectetur scelerisque tempor commodo orci tincidunt
                  lectus. Tincidunt sed molestie ut sed.
                </p>
              </div>
            </div>
            <div className="flex w-[78vw] items-center gap-[20px] relative flex-[0_0_auto]">
              <div className="w-[50vw] p-[10px] flex-1 grow flex items-center justify-center gap-[10px] relative">
                <p className="w-[50vw] w-[616px] mt-[-1.00px] ml-[-5.50px] mr-[-5.50px] text-white text-[22px] relative [font-family:'Inter',Helvetica] font-normal text-justify tracking-[0] leading-[normal]">
                  Lorem ipsum dolor sit amet consectetur. Pellentesque mollis amet venenatis at accumsan purus. Lorem
                  volutpat donec turpis a eros sodales. Sit consectetur scelerisque tempor commodo orci tincidunt
                  lectus. Tincidunt sed molestie ut sed.
                </p>
              </div>
              <div className="items-start inline-flex gap-[10px] relative flex-[0_0_auto]">
                <img className="relative w-[20vw] h-[20vw]" alt="Unsplash" src={fifthStrength} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* What we offer */}
      <div className="absolute w-[98vw] h-[90vh] top-[90vh] left-0">
        <div className="relative w-[98vw] h-[90vh] -left-px">
          <div className="absolute w-[98vw] h-[377px] top-[126px] left-px">
            <div className="relative w-[98vw] h-[90vh] top-[-126px] -left-px bg-cover bg-[50%_50%]"
                style={{backgroundImage: `url(${offerBackground})`}}
            >
              <div className="absolute w-[98vw] h-[377px] top-[126px] left-px bg-[#33bbc599] opacity-60" />
              <div className="absolute w-[98vw] h-[377px] top-[126px]  bg-[#c8ffe0cc]" />
            </div>
          </div>
          <div className="flex flex-col w-[98vw] h-[603px] items-center gap-[11px] px-0 py-[10px] absolute top-0 left-0">
            <div className="relative w-[98vw] h-[150px] mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] text-black text-[54px] text-center leading-[normal] [font-family:'Inter',Helvetica] font-bold tracking-[0]">
              What we offer
            </div>
            <div className="inline-flex justify-center p-[10px] flex-[0_0_auto] items-center relative">
              <div className="flex flex-col w-[30vw] items-center relative">
                <img className="relative flex-[0_0_auto]" alt="Logo" src={logoAITool} />
                <div className="inline-flex items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-black text-[20px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                    Title
                  </div>
                </div>
                <div className="flex-col w-[28vw] h-[194px] px-[10px] py-[5px] flex items-center justify-center gap-[10px] relative">
                  <p className="self-stretch text-black text-[17px] relative [font-family:'Inter',Helvetica] font-normal text-justify tracking-[0] leading-[normal]">
                    Lorem ipsum dolor sit amet consectetur. Pellentesque mollis amet venenatis at accumsan purus. Lorem
                    volutpat donec turpis a eros sodales. Sit consectetur scelerisque.
                  </p>
                  {/* Start GoTo */}
                  <div className="w-[238px] h-[21px] relative">
                    <div
                      className="[font-family:'Inter',Helvetica] w-[238px] left-0 tracking-[0] text-[17px] -top-px h-[21px] font-semibold text-center leading-[normal] absolute text-black"
                    >
                      Go to ... -&gt;
                    </div>
                  </div>
                  {/* End GoTo */}
                </div>
              </div>
              <div className="inline-flex items-center justify-center px-[10px] py-0 relative flex-[0_0_auto]">
                <img className="relative w-px h-[320px] mr-[-0.46px]" alt="Separator" src={verticalSeparator} />
              </div>
              <div className="flex flex-col w-[30vw] items-center relative">
                <img className="relative flex-[0_0_auto]" alt="Logo" src={logoSearch} />
                <div className="inline-flex items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-black text-[20px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                    Title
                  </div>
                </div>
                <div className="flex-col w-[28vw] h-[194px] px-[10px] py-[5px] flex items-center justify-center gap-[10px] relative">
                  <p className="self-stretch text-black text-[17px] relative [font-family:'Inter',Helvetica] font-normal text-justify tracking-[0] leading-[normal]">
                    Lorem ipsum dolor sit amet consectetur. Pellentesque mollis amet venenatis at accumsan purus. Lorem
                    volutpat donec turpis a eros sodales. Sit consectetur scelerisque.
                  </p>
                  {/* Start GoTo */}
                  <div className="w-[238px] h-[21px] relative">
                    <div
                      className="[font-family:'Inter',Helvetica] w-[238px] left-0 tracking-[0] text-[17px] -top-px h-[21px] font-semibold text-center leading-[normal] absolute text-black"
                    >
                      Go to ... -&gt;
                    </div>
                  </div>
                  {/* End GoTo */}
                </div>
              </div>
              <div className="inline-flex items-center justify-center px-[10px] py-0 relative flex-[0_0_auto]">
                <img className="relative w-px h-[320px] mr-[-1.00px]" alt="Separator" src={verticalSeparator} />
              </div>
              <div className="flex flex-col w-[30vw] items-center relative">
                <img className="relative flex-[0_0_auto]" alt="Logo" src={logoWrite} />
                <div className="inline-flex items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-black text-[20px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                    Title
                  </div>
                </div>
                <div className="flex-col w-[28vw] h-[194px] px-[10px] py-[5px] flex items-center justify-center gap-[10px] relative">
                  <p className="self-stretch text-black text-[17px] relative [font-family:'Inter',Helvetica] font-normal text-justify tracking-[0] leading-[normal]">
                    Lorem ipsum dolor sit amet consectetur. Pellentesque mollis amet venenatis at accumsan purus. Lorem
                    volutpat donec turpis a eros sodales. Sit consectetur scelerisque.
                  </p>
                  {/* Start GoTo */}
                  <div className="w-[238px] h-[21px] relative">
                    <div
                      className="[font-family:'Inter',Helvetica] w-[238px] left-0 tracking-[0] text-[17px] -top-px h-[21px] font-semibold text-center leading-[normal] absolute text-black"
                    >
                      Go to ... -&gt;
                    </div>
                  </div>
                  {/* End GoTo */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Intro */}
      <div className="absolute w-[98vw] h-[90vh]"
          style={{backgroundColor: '#33BBC5'}}
      >
        <div className="inline-flex flex-col items-start gap-[10px] absolute top-0 left-px">
          <div className="inline-flex flex-col items-start gap-[10px] relative flex-[0_0_auto]">
            <img className="relative w-[98vw] h-[90vh]" alt="Rectangle" src={introBackground} />
            <img className="absolute w-[370px] h-[340px] top-0 right-0 !h-[418px] !w-[451px] !top-[19px]" 
                 alt="Pattern dot" 
                 src={dotTextureTopRight} />
            <div className="absolute w-[332px] h-[323px] bottom-[50px] right-[50px] bg-cover bg-[50%_50%]" 
                style={{backgroundImage: `url(${introImage})`}}
            />
          </div>
          <div className="flex flex-wrap items-end gap-[0px_31px] absolute top-[100px] left-[100px]"
               style={{flexDirection: 'column', alignItems: 'flex-start'}}
          >
            <div className="relative h-[150px] mt-[-1.00px] [text-shadow:12px_8px_8px_#614bc340] text-white text-[80px] leading-[normal] [font-family:'Inter',Helvetica] font-bold tracking-[0]">
              GREEN DOTS
            </div>
            <p className="relative w-[50vw] h-[291px] [font-family:'Inter',Helvetica] font-normal text-black text-[30px] tracking-[0] leading-[normal]"
              style={{textAlign: 'left'}}
            >
              Green Dots is a platform that allows people to find and navigate nearby recycling collection points. While
              this solution helps everyone easily access current recycling points around their neighborhood, it also
              makes each individual a game-changer through additional features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus
