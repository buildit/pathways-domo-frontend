<template>
  <div>
    <h1>DB Linkage</h1>

    <h2>{{ skillMatchcounter }}</h2>

    <button @click="processGroups">
      06yOPb2J0EV0zTXD4LNI
    </button>


    <ol>
      <li v-for="item of skillLinkageGroup">
        {{ skillGroupsOriginal[item[0]-1] }} - {{ skillsListOriginal[item[1]-1][0] }}
        // {{ skillsListOriginal[item[1]-1][1] }}

        <span v-if="item[2] === '1'"> - Required</span>
      </li>
    </ol>

    <ul v-for="dbs in skillsHolisiticObject">
      <li v-for="(item, key) in dbs">
        {{ key }}: "{{ item }}"
      </li>
    </ul>
  </div>
</template>

<script>
    const fb = require('../services/firebaseConfig.js');

    export default {
        name: "DBLinkage",
        data() {
            return {
                skillsListOriginal: [
                    ["Development process optimisation", "Identifies and explores opportunities for improvements to the software development and delivery process, as well as business improvements. Drives the analysis, identification, prioritisation and implementation of improvements and efficiencies, thereby ensuring that the organisation derives maximum value from the software development effort. This includes recognising the potential for automation of processes, determining costs and benefits of new approaches and managing change or assisting implementation where needed."],
                    ["Modern standards approach", "Uses a modern standards approach throughout automation and testing."],
                    ["Software building", "Uses industry best practices and standards to design, create, test and document new or amended software."],
                    ["Support of deployed software", "Maintains and supports deployed software, including platforms and pipelines in addition to user-facing software and services across the stack."],
                    ["Systems design", "Creates the specification and design of systems to meet defined business needs. Has the ability to work with business and technology stakeholders to translate business problems into technical designs. Able to visualise the ideal user experience, come up with design ideas and possible design approaches. Explores different approaches to solving problems."],
                    ["Systems integration", "Integrates and tests components, systems and their interfaces to create vertical user functionality and business value."],
                    ["User focus", "Understands users and can identify who they are and what their needs are based on evidence. Able to translate user stories and propose design approaches or technical solutions to meet these needs and engages in meaningful interactions and relationships with users. Puts users first and can manage competing priorities."],
                    ["Technical vision", "Understands the importance of having a technical vision and can switch from the high level (defining it) to the low level (how it applies and shapes day to day work)."],
                    ["Availability and capacity management", ""],
                    ["Information security", ""],
                    ["Prototyping", ""],
                    ["Abstracting", "Discovering reusable archetypes, workflows, and patterns, and encoding them for future use."],
                    ["Bridging the gap between the technical and non-technical", "Translates technical concepts between software engineering, delivery management and service management so they are understood by all."],
                    ["Making and guiding decisions", "Capable of making and guiding effective decisions, explaining clearly how the decision has been reached. The ability to understand and resolve technical disputes across varying levels of complexity and risk."],
                    ["Turning business problems into technical design", "The ability to work with business and technology stakeholders to translate business problems into technical designs. Creates an optimal design through an iterative process, aligning the user need with the system requirements and organisational objectives."],
                    ["Understanding the whole context", "The ability to look beyond the immediate technical problem and identify the wider implications. ‘Zooming out’ in three dimensions - knowing relevant historical context and future impact, understanding how current work fits in broader contexts and strategies, and looking for deeper underlying problems and opportunities."],
                    ["Governance", "Understands technical governance and is able to participate in or deliver the assurance of a service. This capability becomes increasingly critical at senior role levels."],
                    ["Strategy", "Capable of producing strategy for technology that meets business needs. Able to create, refine and challenge patterns, standards, policies, roadmaps and vision statements. Senior roles tend to be more proactive as they set the strategy. Junior roles tend to be more reactive, responding to the strategy."],
                    ["Interaction Design", "An ability to translate a user need into a digital experience across touch points demonstrating simplicity and a realistic understanding of the challenges. Synthesizes and imagines how products and their uses can be improved within the environmental context by exploring the confluence of behavior, human-computer interaction, and software capabilities. This exploration includes factors beyond the digital, including the physical, emotional, efficacy and efficiency of information transfer."],
                    ["Visual Communication", "Communicate ideas visually and elegantly. Conveys ideas and information in a manner that adheres to effective and efficient delivery, void of vagueness and friction, through visual elements including signage, typography, composition, graphics, illustration, industrial design, animation, and color."],
                    ["Core Development", "A solid grounding in UI development (HTML, CSS, Javascript) frameworks, techniques and approaches. Has a comprehensive understanding and working knowledge of semantic HTML and CSS along with modern frameworks for user interface development. Understands and applies modern coding techniques, methods and processes in approaches to interface development. This skill also covers the delivery outcome UI development."],
                    ["User Empathy", "Maintains and supports services. Able to understand and comprehend both superficial and underlying needs of a user within the context of digital products, including identifying latent customer needs in to create products that the users or customers don't even know they desire, or solutions that customers have difficulty envisioning due to lack of familiarity with the possibilities."],
                    ["Relationships", "Good social skills and empathy are key to building relationships and understanding a user problem. Able to build trust relationships with clients to provide assurance of capability, continually working with clients to identify needs and solutions."],
                    ["Strategic Thinking", "Guiding and working with clients and users towards great digital solutions requires an understanding of the landscape and the ability to go beyond the immediate ask. Able to think and practice working models based on foresight into wide factors within organizational or customer-level capacity, resources or needs, answering the 'why' and 'how' as opposed to the 'what' in the context of achieving the best solution for a scenario. Capable of managing competing priorities to reach defined outcomes."],
                    ["Facilitation", "As well as defining and planning workshops the ability lead and bring clients along with you on the journey"],
                    ["User Experience Design", "Increases the user satisfaction of digital products through improvements to usability, accessibility, heuristics, and pleasure of use and interaction."],
                    ["Pattern Libraries", "Applies basic atomic design principles in design and development of digital product, providing interface and usage consistency through componentization, in most cases scaffolding a publicly accessible web-based representation model as a single source of truth for development teams to consume."],
                    ["Accessibility", "Applies context sensitive design and development practices within digital interfaces covering motor, cognitive, hearing and visual impairments across a broad spectrum of severity levels, using the defined (WCAG) guidelines as a baseline for implementation."],
                    ["Design Operations & Governance", "Defines and establishes common practices for design and development teams to create and issue artefacts, maintain version control, and govern updates and changes to any design element of a digital product."],
                    ["Big Picture Leadership", "Coaches and gives feedback to people at any seniority level; adapts their approach to the needs of a situation; helps teams create a compelling vision; helps teams and leaders set clear expectations; understands the team’s product, customers, and other stakeholders; understands the entire system surrounding their organization; understands how the organizational goals fit into a larger context. Manages client and executive level expectations."],
                    ["Coaching - Delivery, Team, 1:1, Executive", "Coaches teams, individuals and/ or executives with delivery-related processes, expectations, and practices, including to: define and measure success, track progress towards goals, break down work into small valuable pieces, quality engineering and product development practices, bring clarity to the delivery team’s backlog and future roadmap, communicate progress to stakeholders, develop delivery plans in collaboration with the team, identify how to improve processes, review and improves processes Encourages and facilitates teams to improve toward higher performance (impact, delivery, health)."],
                    ["Project and Program Management", "Tracks health and status of project deliverables; highlights risks and presents mitigation solutions; calls out dependencies and blockers within the team, highlights risks and provides mitigation solutions; manages communication of project status and deliverables; manages client and executive expectations."],
                    ["Agile-Lean Advocacy", "Establishes and assesses baseline Agile skills for a team; explains and role models Agile values; teaches and mentors Agile concepts, principles, and practices; teaches and mentors Lean concepts, principles, and practices; teaches and mentors XP concepts, principles, and practices."],
                    ["Facilitation", "Facilitates sessions, meetings or workshops for an individual, team, leader, or group; designs sessions based on the needs and dynamics of the group; facilitates dynamic changes in agenda as needed; ensures all perspectives are shared; captures and communicates outcomes from the event; uses visualization and visual language to aid; encourages participants to share their takeaways and/or action items. Encourages participants to share their takeaways and/or action items."],
                    ["Continuous Improvement", "Presents data options based on the client’s org goals; uses metrics driven by team output to improve on delivery; works with the client to translate goals into metrics; presents plan to measure fact based goals and engage in proper feedback and improvement loops; works with the team using Retrospective data to inspect, adapt and improve on processes and delivery."],
                    ["Business Development", "Whist on a client engagement, having a good sense for new opportunities within the client organization; helps with pre-sales- creating RFP’s, SoW’s; involved with client presentations; presents content during GCP summits."],
                    ["Organizational Health & Change Management", "Help clients address the “human side” of their organization systematically. Start at the top and engage every layer during transformation and change efforts. Work with the client to make a formal case regarding why change is needed. Create ownership within client leadership. Support client in communicating the change message. Asses the client org’s cultural landscape and make the culture explicit. Prepare the client for the unexpected. Counsel individuals along the way."],
                    ["Recruitment Life Cycle", ""],
                    ["Recruitment Practices", ""],
                    ["Candidate Experience", ""],
                    ["Permanent and Contingent Staffing", ""],
                    ["Supplier Rationalisation", ""],
                    ["Talent Management", ""],
                    ["Policies & Regulations", ""],
                    ["Talent Operations", ""],
                    ["Workforce Management", ""],
                    ["Technology & Innovation", ""],
                    ["Candidate & Employee Value Proposition", ""],
                    ["Staffing Solutions", ""],
                    ["Change Management", ""],
                    ["Internal Mobility", ""],
                    ["Advisory & Strategy", ""],
                    ["Process Improvements", ""],
                    ["Development process optimisation", "Identifies and explores opportunities for service and business improvement. Drives the analysis, identification, prioritisation and implementation of improvements and efficiencies, thereby ensuring that the organisation maintains or exceeds financial plan. This includes recognising the potential for automation of processes, determining costs and benefits of new approaches and managing change or assisting implementation where needed."],
                    ["Modern standards approach", "Uses a modern standards approach throughout automation and report management"],
                    ["Budget development", "Identifies and utilizes trends from previous years to develop budget plans for fiscal year. Based on current projection of client work and staffing levels."],
                    ["Profit and Loss management", "Builds and maintains dashboards and reports that identify P&L profiles based on SAP (FLEX) reporting data"],
                    ["Perform trend analysis", "Guides cost analysis process by establishing and enforcing policies and procedures; providing trends and forecasts; explaining processes and techniques; recommending actions"],
                    ["Systems integration with Wipro Digital", "Making sure internal reporting is presented and bought off by Wipro Digital financial organizations. Included the integration with FLEX into SAP on monthly basis."],
                    ["Big Picture Leadership", "Coaches and gives feedback to people at any seniority level; adapts their approach to the needs of a situation; helps teams create a compelling vision; helps teams and leaders set clear expectations; understands the team’s product, customers, and other stakeholders; understands the entire system surrounding their organization; understands how the organizational goals fit into a larger context. Manages client and executive level expectations."],
                    ["Sales Ability", "Able to solution design-build, build, and transformation engagements. Able to cross functionally work with our practice counterparts domestically and internationally to develop the best fit approach for clients. Able to bring the value proposition to life through effective story-telling."],
                    ["Project and Program Management", "Tracks health and status of sales opportunities. Calls out dependencies and blockers within the team, highlights risks and provides mitigation solutions; manages communication of project status and deliverables; manages client and executive expectations."],
                    ["Pitches & Client Meetings", "Participates in sessions, meetings or workshops for client individuals, teams, leaders, or groups. Able to speak to any level of client on their transformation journey, and the WD offerings most appropriate and recommended to their business goals. Encourages participants to share their takeaways and/or action items."],
                    ["Business Development", "Continuously evolving the conversation with stakeholders and bringing clients back to the table. Aware of account status and the ongoings of new opportunities. Aware of and maintains relationships with key stakeholders on the client side, including GCPs. Having a good sense for new opportunities within the client organization; helps with pre-sales- creating RFP’s, SoW’s; involved with client presentations; presents content during GCP summits."],
                    ["Strategy", "Owns and refines the sales strategy of Buildit, within Wipro Digital, and in working relationships with other practices. Shapes and drives sales strategy as the market changes and as Buildit’s capabilities grow and strengthen."]
                ],
                skillGroupsOriginal: [
                    "Software Engineering",
                    "Architecture",
                    "Creative Tech & Design",
                    "Delivery",
                    "Talent",
                    "Finance Operations",
                    "Business Development & Strategy"
                ],
                skillDescriptionsOriginal: [
                    ["Aware of the importance of developing process efficiency and the common ways in which processes are optimised. Supports specific activities to improve development processes. Able to spot or identify obvious deficiencies.", "0", "1"],
                    ["Able to identify process optimisation opportunities with guidance and contribute to the implementation of proposed solutions.", "1", "1"],
                    ["Able to analyse current processes, identify and implement opportunities to optimise them, and leads and develops a team of experts to deliver improvements. Drives adoption of changes across the organisation.", "2", "1"],
                    ["N/A", "3", "1"],
                    ["Aware of the importance of adopting a modern standards approach.", "0", "2"],
                    ["Understands key principles of modern standards approach and how they apply to the work they are undertaking, and will apply under guidance.", "1", "2"],
                    ["Uses a modern standards approach competently and guides others in so doing.", "2", "2"],
                    ["Strong understanding and application of the most appropriate modern standards and practices. Takes responsibility for coaching and guiding others.", "3", "2"],
                    ["Uses agreed security standards and specifications to design, create, test and document new or amended software.", "0", "3"],
                    ["Designs, codes, tests, corrects and documents simple programs or scripts under the direction of others.", "1", "3"],
                    ["Collaborates with others when necessary to review specifications and uses these agreed specifications to design, code, test and document programmes or scripts of medium to high complexity, using the right standards and tools.", "2", "3"],
                    ["Advises on the right way to apply standards and methods, ensuring compliance, and maintains technical responsibility for all the stages and iterations of a software development project. Provides technical advice to stakeholders and sets the team-based standards for programming tools and techniques.", "3", "3"],
                    ["Assists in investigation and resolution of infrastructure, platform or software problems undertaking specific activities under direction of others.", "0", "4"],
                    ["Able to identify and fix faults as well as carry out regular audit and maintenance of deployed software, drawing on expert input where necessary.", "1", "4"],
                    ["Identifies, analyses and competently fixes faults, with consideration to user impact and medium or long term implications. Can lead others in tackling faults.", "2", "4"],
                    ["N/A", "3", "4"],
                    ["Assists as part of a team on design of components of larger systems.", "0", "5"],
                    ["Translates logical designs into physical designs. Produces detailed designs and documents all work using required standards, methods and tools, including prototyping tools where appropriate. Designs systems characterised by managed levels of risk, manageable business and technical complexity and meaningful impact. Works with well-understood technology and identifies appropriate patterns.", "1", "5"],
                    ["Designs systems characterised by medium levels of risk, impact and business or technical complexity. Selects appropriate design standards, methods and tools and ensures they are applied effectively. Reviews the systems designs of others to ensure selection of appropriate technology, efficient use of resources and integration of multiple systems and technology.", "2", "5"],
                    ["Designs systems characterised by medium levels of risk, impact and business or technical complexity. Selects appropriate design standards, methods and tools and ensures they are applied effectively. Reviews the systems designs of others to ensure selection of appropriate technology, efficient use of resources and integration of multiple systems and technology.", "3", "5"],
                    ["Aware of how to integrate systems and the challenges of designing, building and testing interfaces between systems.", "0", "6"],
                    ["Able to build and test simple interfaces between systems, or can work on more complex integration as part of a wider team.", "1", "6"],
                    ["Defines the integration build. Able to coordinate build activities across systems and understands how to undertake and support integration testing activities.", "2", "6"],
                    ["N/A", "3", "6"],
                    ["Has an awareness or understanding of user experience analysis and its principles. Can see the purpose of user stories and focuses on user needs.", "0", "7"],
                    ["N/A", "1", "7"],
                    ["Able to collaborate with user researchers and can sell and represent users internally. Understands the difference between user needs and desires of the user. Able to champion user research to focus on all users. Can prioritise and defines approaches to understand the user story, guiding others in doing so. Can offer recommendations on the best tools and methods to be used.", "2", "7"],
                    ["N/A", "3", "7"],
                    ["Understands the importance of a technical vision and how that translates into day-to-day work", "0", "8"],
                    ["Implements the elements of work to realise the technical vision", "1", "8"],
                    ["Contributes towards and challenges the strategic technical vision", "2", "8"],
                    ["Defines a strategic technical vision that achieves business objectives, and gains client buy-in.", "3", "8"],
                    ["", "0", "9"],
                    ["", "1", "9"],
                    ["", "2", "9"],
                    ["", "3", "9"],
                    ["", "0", "10"],
                    ["", "1", "10"],
                    ["", "2", "10"],
                    ["", "3", "10"],
                    ["", "0", "11"],
                    ["", "1", "11"],
                    ["", "2", "11"],
                    ["", "3", "11"],
                    ["", "0", "12"],
                    ["Understands abstractions and is able to work with them.", "1", "12"],
                    ["Derives abstractions from empirical information.", "2", "12"],
                    ["Defines abstractions that are reusable across engagements (e.g. architecture patterns).", "3", "12"],
                    ["", "0", "13"],
                    ["Able to speak on behalf of technical teams and facilitate the relationships with direct and indirect stakeholders.", "1", "13"],
                    ["Able to listen to the needs of the technical and business stakeholders and interpret between them. Capable of proactive and reactive communication.", "2", "13"],
                    ["Able to mediate and mend relationships, communicating with stakeholders at all levels.", "3", "13"],
                    ["Able to recommend decisions and describe the reasoning behind these. Capable of identifying and articulating technical disputes between direct peers and local stakeholders.", "0", "14"],
                    ["Able to make decisions characterised by managed levels of risk and complexity and recommend decisions as risk and complexity increase. Capable of resolving technical disputes between wider peers and indirect stakeholders, taking into account all views and opinions.", "1", "14"],
                    ["Able to make decisions characterised by medium levels of risk and complexity and recommend decisions as risk and complexity increase. Able to build consensus between services or independent stakeholders.", "2", "14"],
                    ["Able to make and justify decisions characterised by high levels of risk, impact and complexity. Builds consensus between organisations (private or public) or highly independent and diverse stakeholders.", "3", "14"],
                    ["", "0", "15"],
                    ["Designs systems characterised by managed levels of risk, manageable business and technical complexity and meaningful impact. Works with well-understood technology and identifies appropriate patterns.", "1", "15"],
                    ["Designs systems characterised by medium levels of risk, impact and business or technical complexity. Works across multiple services or a single large or complicated service.", "2", "15"],
                    ["Designs systems characterised by high levels of risk, impact and business or technical complexity.", "3", "15"],
                    ["Able to understand how their work supports the team and identify the wider influences and how they apply. Able to keep an open mind and understand the broader context.", "0", "16"],
                    ["Able to understand trends and practices outside their team and how these will impact their work. Able to understand how their work fits into the broader strategy and historical context. Capable of considering the patterns and interactions on a larger scale.", "1", "16"],
                    ["Able to understand trends and practices within the broader organisation and how these will impact their work. Able to look for deeper underlying problems and opportunities. Can anticipate problems before they occur and identify the impact of changes to policy.", "2", "16"],
                    ["Able to understand trends and practices outside their organisation and how these will impact their work. Can anticipate changing policy.", "3", "16"],
                    ["Understands how governance works and is able to participate in assurance.", "0", "17"],
                    ["Understands how governance works and what governance is required. Capable of taking responsibility for the assurance of parts of a service, knows what risks need to be managed.", "1", "17"],
                    ["Capable of evolving and defining governance and taking responsibility for collaborating and supporting in wider governance. Knows how to assure services delivered by technical architects across sets of services.", "2", "17"],
                    ["Able to understand how technical governance works with wider governance (for example, budget). Capable of assuring corporate services by understanding key risks and mitigation through assurance mechanisms.", "3", "17"],
                    ["Aware of the purpose and application of strategy, standards, patterns, policies, roadmaps and vision statements.", "0", "18"],
                    ["Capable of applying strategy, using patterns, standards, policies, roadmaps and vision statements. Able to challenge them and provide guidance.", "1", "18"],
                    ["Capable of defining and challenging strategies, patterns, standards, policies, roadmaps and vision statements. Capable of providing proactive advice and guidance for their definition across the organisation.", "2", "18"],
                    ["Capable of shaping and influencing organisational strategy. Able to own and be responsible for setting strategies, patterns, standards, policies, roadmaps and vision statements.", "3", "18"],
                    ["Has a broad understanding of how digital products are affected by human factors, including behavioral, psychological, emotional, and cultural aspects.", "0", "19"],
                    ["Able to utilize defined user experience and usability practices to refine flows on information between user and digital receptacles to provide efficient interactions that create delight, meaning, or accomplishment.", "1", "19"],
                    ["Able to identify and employ specific usability processes best suited to improve the interaction between human and digital interface. Leads collaborations with team members to resolve complex information flows. Seeks to strike best balance between machanical requirements, business strategy and human need fulfillment.", "2", "19"],
                    ["Performs comprehensive usability practices across customer and user experience, tactile design, current and future state journeys, and strategic planning to create environments and ecosystems to support direct user interfaces with consistent, heuristically-based interactions.", "3", "19"],
                    ["Has broad understanding of how visual elements are used to convey information. Has working knowledge of tools used to create visual conveyances.", "0", "20"],
                    ["Uses appropriate tools to effectively convey concepts, information and insights effectively utilizing appropriate mixes of visual elements.", "1", "20"],
                    ["Understands best practices for conveying information visually within projects in a consistent and cohesive manner. Advises on the manner to approach and apply common patterns, while seeking ways to innovating in the visual communication space.", "2", "20"],
                    ["Establishes best practices that provide a foundation for conveying information visually across projects and teams in a consistent and cohesive manner. Advises on the manner to approach and apply common patterns, while setting new means for innovating in the visual communication space.", "3", "20"],
                    ["Has fundamental knowledge of HTML and CSS techniques and can apply both in tandem to create a basic digital interface.", "0", "21"],
                    ["Has significant knowledge of semantic HTML and CSS, and uses basic frameworks to develop highly detailed digital interfaces based on designs.", "1", "21"],
                    ["Regularly works with extensive, intricate semantic HTML and CSS as well as Javascript and modern frameworks in developing digital interfaces. Able to strategically componentize and decompose structures into atomic elements for reusability. Uses common best practices for deploying interfaces.", "2", "21"],
                    ["Advises on the right way to apply standards and methods, ensuring compliance, and maintains technical responsibility for all the stages and iterations of digital interface development of a project. Provides technical advice to stakeholders and sets the team-based standards for programming tools and techniques. Is acutely aware of the capabilities, benefits, and drawbacks for a wide range of modern frameworks.", "3", "21"],
                    ["Able to understand and express the existing constraints of a given user and how needs of a user changes through the life cycle of a digital product, and that design must account for these future scope needs.", "0", "22"],
                    ["Visualizes and expresses complex user behavioral concepts into simplistic prototypes to explain and experiment against. Performs role-playing exercises to understand and dissect the nature of complex behavioral concepts into comprehensive.", "1", "22"],
                    ["Refines complex user behavioral concepts into commercializable outputs, taking into account wider factors including accessibility, strategic alignment, and technological innovation.", "2", "22"],
                    ["Advises on the right ways to apply empathetic design approaches to solve broader customer and user issues, maintaining consistency with long-term program goals and invoking wider ideas of product innovation to meet strategic needs. Continually enforces asking 'what are we missing', while seeking insights and opportunities to grow programs.", "3", "22"],
                    ["Has observational or informational contact with client project leaders, management and decision-makers.", "0", "23"],
                    ["Has regular contact with client project leaders, management and decision-makers to discuss tactical delivery of products.", "1", "23"],
                    ["Has regular contact with client project leaders, management and decision-makers concerning strategic intiatives and processes starting at early phases of projects.", "2", "23"],
                    ["Performs regular pre-sales activities and pitches, and has ongoing high level and tactical discussions with client decision-makers to formulate strategies for inducting projects into the workflow.", "3", "23"],
                    ["N/A", "0", "24"],
                    ["Understands how to ask questions that answer the 'why' and 'how' of a context or solution and differentiate this from the 'what'.", "1", "24"],
                    ["Demonstrates clarity of vision, analyze current position and options, effectively prioritize efforts toward achieving goals. Seeks to demonstrate increased value proposition to clients through flexible but methodical processes.", "2", "24"],
                    ["Identifies and explores opportunities for synergistic long-term outcomes through a mix of tactical execution, design thinking, innovation, and comprehensive understanding of domains. Effectively uses resources to build upon existing programs to increase value to the client.", "3", "24"],
                    ["Understands the role of design leadership in shaping effective product development discussions and participates in workshops.", "0", "25"],
                    ["Participates in project workshops with internal teams and clients, occasionally providing subject-matter expertise where skill level is appropriate.", "1", "25"],
                    ["Defines and plans workshops with teams and clients, often leading discussions while providing subject-matter expertise. Able to redirect conversations when necessary and greach consensus amongst participants.", "2", "25"],
                    ["Defines, plans, and leads workshops, providing a leadership role that allows for growth, alignment and synergy between participants to ensure strategic alignment within projects and programs.", "3", "25"],
                    ["Is aware of the importance of user experience design within the context of digital interface development.", "0", "26"],
                    ["Can compose rough wireframes and greybox templates for multipage digital products that utilize consistent and efficient information flow that follows a defined user story or user journey.", "1", "26"],
                    ["Able to create appropriate artefacts necessary to convey a complete user journey. Able to composite prototypes using tools or code to experiment and validate a potential interaction state. Has sound knowledge of user experience best practices and modern techniques for interaction.", "2", "26"],
                    ["Highly skilled in all aspects of user experience design, from user journey mapping to wireframing to prototyping from both strategic and tactical perspectives. Regularly sought as opinion leader in user experience questions. Able to apply best practices and establish patterns for creating efficient and engaging experiences across a wide variety of needs, platforms, devices, and contexts.", "3", "26"],
                    ["Understands the basic atomic design principles.", "0", "27"],
                    ["Able to identify and decompose design interfaces into elements, molecules and organisms. Is familiar with one or more tools for collating pattern libraries into publicly accessible resource.", "1", "27"],
                    ["Able to create designs based on atomic design principles, and interactively create a token repository of components, elements, and organisms. Is regarded as a go-to resource concerning pattern development across the wider spectrum of a project.", "2", "27"],
                    ["Highly regarded as key resource for atomic design application, as well as various types of implementations including living style guides, user interface code libraries, and complete design systems. Establishes best practices in the development of pattern libraries across one or more projects.", "3", "27"],
                    ["Understands that the difference between types and needs of impairments and what context sensitivity issues exist in accessibility.", "0", "28"],
                    ["Has fundamental understanding of elements of application of WCAG and other accessibility standards. Applies accessibility recommendations as provided by advisors within the context of a project.", "1", "28"],
                    ["Has understanding of WCAG and other accessibility standards, including principles and compliance levels, and the application of requirements. Is able to perform in-line testing of compliance.", "2", "28"],
                    ["Has extensive understanding of WCAG and other accessibility standards, including principles and compliance levels, and the application of requirements. Is able to perform in-line testing of compliance, and provide recommendations when compliance levels are not directly met. Establishes best practices for ensuring compliance throughout design and development efforts, and establishes governance practices for future needs.", "3", "28"],
                    ["Understands the concept of DesOps and how it fits into an iterative design-development framework. Understands the concept of version control and its importance in effective product delivery (SDLC).", "0", "29"],
                    ["Understands how to use DesOps tools in conjunction with projects and delivery. Has understanding and working knowledge of version control and operating commands.", "1", "29"],
                    ["Able to create effective and appropriate DesOps model for a project and integrate it into the DevOps and overall Agile processes. Establishes basic practices for executing DesOps, including defining basic collaboration, day-to-day operations and establish a basic framework for ongoing governance beyond the project.", "2", "29"],
                    ["Establishes DesOps and governance models at the outset of projects, incorporating known best practices and ensuring compliance with DevOps, CI/CD, and other existing frameworks while providing for improved collaboration and communication across teams. Provides recommendations for tools and concepts needed to establish most effective and efficient operations.", "3", "29"],
                    ["", "0", "30"],
                    ["Helps the scrum team set clear expectations of delivery and adapts their approach to the needs of a situation; understands the team’s goals and product; understands how the organizational goals fit into a larger context. Manages client and team expectations. Leads Scrum team to deliver value.", "1", "30"],
                    ["Coaches and gives feedback at the team and seniority level; helps teams create a compelling vision; understands the team’s product, customers, and other stakeholders; understands how the organizational goals fit into a larger context. Manages client and executive level expectations.", "2", "30"],
                    ["Practitioner skillset + Coaches and providing ideas and solutions to achieve organizational goals to executive level leadership.", "3", "30"],
                    ["", "0", "31"],
                    ["Coaches teams to improve toward higher performance (impact, delivery, health); assesses and recommends improvements; helps address and resolve team conflict.", "1", "31"],
                    ["Coaches individuals and teams to improve toward higher performance (impact, delivery, health); assesses and recommends improvements; helps individuals communicate effectively; helps address and resolve conflict or difficult conversations; collaborates with team stakeholders to help individuals reach high performance.", "2", "31"],
                    ["Practitioner skillset + Coaches at the executive level; collaborates with leaders to help teams and individuals reach high performance.", "3", "31"],
                    ["", "0", "32"],
                    ["Project coordination. Tracks health and status of project deliverables; highlights risks and presents mitigation solutions; calls out dependencies and blockers within the team.", "1", "32"],
                    ["Project and Program level management; encourages and facilitates teams to improve toward higher performance; tracks health of project deliverables; highlights risks and provides mitigation solutions to the client; manages communication of project status and deliverables to the client and executive management. Manages client and executive expectations of delivery output.", "2", "32"],
                    ["Practitioner skillset + Program level management; communication and problem solving with executives; helps shape organizational programs by turning a need and problem statement into workable solutions.", "3", "32"],
                    ["", "0", "33"],
                    ["One framework (Scrum); assesses baseline Agile skills for a team; explains, teaches and role models Agile values; leads scrum team to deliver value; defines and measure success; breaks down work into small, valuable pieces, has clarity to the delivery team’s backlog and future roadmap; communicates progress to stakeholders.", "1", "33"],
                    ["Multiple frameworks (Scrum, SAFe, or LeSS); assesses baseline skills for a team; teaches and mentors Agile and Lean concepts; implements CI/CD practices; develops delivery plans in collaboration with the team’s goals; Communicates progress to stakeholders and executives.", "2", "33"],
                    ["Practitioner + Works with executives to help shape and understand the why or why not to implement certain frameworks for delivery.", "3", "33"],
                    ["", "0", "34"],
                    ["Facilitates scrum working sessions for the team; captures and communicates outcomes f encourages participants to share their takeaways and/or action items. Shows outcomes and action items of the meeting.", "1", "34"],
                    ["Facilitates sessions or workshops; designs sessions based on the needs and dynamics of the group; facilitates dynamic changes in agenda as needed; captures and communicates outcomes from the event; encourages participants to share their takeaways and action items.", "2", "34"],
                    ["Practitioner + Facilitates workshops for executive level stakeholders.", "3", "34"],
                    ["", "0", "35"],
                    ["Presents data options based on the client’s org goals, based on metrics driven by Scrum team output; delivers ideas to improve, change processes as needed. Retro …", "1", "35"],
                    ["Presents data options based on the client’s org goals; uses metrics driven by team output; works with the client to translate goals into metrics; present plan to measure those goals along with engaging in proper feedback practice and improvement loops; using Retrospective outcomes to present improvement plans for delivery.", "2", "35"],
                    ["Practitioner + Works with executives to define success of the organization; implementing fact based metrics to drive towards their goals.", "3", "35"],
                    ["", "0", "36"],
                    ["Whilst on a client engagement, having a good sense for new opportunities within the client organization, trying to bring in more business beyond the engagement you are working on.", "1", "36"],
                    ["Whilst on a client engagement, having a good sense for new opportunities within the client organization; helps with pre-sales activities- RFP’s, SoW’s; involved with client presentations; presents content during GCP summits.", "2", "36"],
                    ["Practitioner + Presents sales opportunities to executives.", "3", "36"],
                    ["", "0", "37"],
                    ["Has solid theoretical knowledge and understanding of organizational health and change management.", "1", "37"],
                    ["Is able to put theoretical knowledge to practice using any number of tool/techniques. Shares learnings with DL community.", "2", "37"],
                    ["Has proven track record of successful org health/change management programs with client. Shares learnings with DL community.", "3", "37"],
                    ["Broader understanding of RLC, how full cycle works and how it operates at each stage.", "0", "38"],
                    ["Able to action each stage of the RLC and evaluate outcome of the delivery.", "1", "38"],
                    ["Able to lead and manage the RLC, including driving high collaboration and engagement with core stakeholders.", "2", "38"],
                    ["Performs redesign of RLC at scale to meet the required growth and productivity. Accesses the balance between technology and human approach, incorporates relevant strategies into RLC.", "3", "38"],
                    ["Has a broader understanding on the range of practices available to hire the required skill talent.", "0", "39"],
                    ["Able to use range of recruitment practices to attract contingent and permanent hires.", "1", "39"],
                    ["Evaluating and measuring the outcome at every stage of the cycle, incorporating required change to achieve delivery.", "2", "39"],
                    ["Evaluates delivery and recruitment parties and seek innovation through technology and human approach.", "3", "39"],
                    ["Providing engaging candidate experience, by driving regular updates to candidates.", "0", "40"],
                    ["Managing consistent interaction with all candidates, providing and obtaining feedback on service delivery from successful and uncessful candidates.", "1", "40"],
                    ["Able to evaluate, construct and develop an effective candidate experience strategy to drive business growth.", "2", "40"],
                    ["Strategic review of RLC and MIs to drive change management, improvement and perform cost saving analysis on hiring spend.", "3", "40"],
                    ["Understand the RLC for the required staffing need,", "0", "41"],
                    ["Review and analysis perm/contingent staffing and amend/adapt workflow to drive best practice.", "1", "41"],
                    ["Propose and drive continuous improvement effort of engagement of perm/contingent workforce.", "2", "41"],
                    ["Reviews cost, risk and benefits associated with the staffing approach. Conducts staffing criticality analysis and forms requires staffing strategy.", "3", "41"],
                    ["Build strong supplier relationships to support talent objectives.", "0", "42"],
                    ["Monitor and development of supplier understanding of business need.", "1", "42"],
                    ["Conduct market analysis and assessment of key suppliers that align to business needs to support hiring plan. Reviews processes with procurement by providing delivery agency data.", "2", "42"],
                    ["Works with procurement to review/analyse/amend suppliers based on performance and contractual KPI’s.", "3", "42"],
                    ["Basic understanding of the TM model.", "0", "43"],
                    ["Basic understanding of the TM model.", "1", "43"],
                    ["Leveraging TM Model into operational processes, driving innovation through TM practices.", "2", "43"],
                    ["Partner with leadership to understand business goals and drivers, to plan and implement TM strategies", "3", "43"],
                    ["General knowledge of legislative changes that will effect RLC.", "0", "44"],
                    ["Ability to work with HRBP to ensure compliance with in country legislation.", "1", "44"],
                    ["Able to audit consistently operational workflows and adapt required change management.", "2", "44"],
                    ["Ability to summarise, communicate and adapt amendments to policies/regulations.", "3", "44"],
                    ["Understand TO processes and key personnel.", "0", "45"],
                    ["Able to own sections of TO processes, by measuring the outcomes of delivery.", "1", "45"],
                    ["Responsible for individual and teams productivity through mentoring and self learning.", "2", "45"],
                    ["Providing leadership excellence through mentoring and coaching.", "3", "45"],
                    ["Appreciation of the workforce management concept and how it relates to supporting with a recruitment delivery.", "0", "46"],
                    ["Ability to support with scheduling, forecasting and skills management resulting in increased internal or external hiring.", "1", "46"],
                    ["Leads on processes of skill gap analysis and level of experience. Identifies gaps within the population, forms results of analysis for leadership, adopts relevant change into hiring plans.", "2", "46"],
                    ["Leads on overall strategy with wider business and leadership. Reviews risk and gaps associated with skill gaps, retention and staff development.", "3", "46"],
                    ["Grasp of systems and innovative thinking to support recruitment and delivery.", "0", "47"],
                    ["Utilisation of all company technology and systems as part of BAU RLC, recommending improvements through sourcing/ recruitment practices.", "1", "47"],
                    ["Lead on continuously brainstorming and change management — directing on identifying and implementing new technology aligned to simplification of hiring journey success.", "2", "47"],
                    ["Acts as primary lead against all continuous process improvements via the effective use of technology to align with positive employee journey from on to off-boarding.", "3", "47"],
                    ["Comprehension of importance of CVP and EVP and how it aligns to overall Talent team functions and roles and responsibilities.", "0", "48"],
                    ["Ability to support and action on the tasks that facilitate positive CVP and EVP through RLC. Ensuring company value proposition at forefront of practices.", "1", "48"],
                    ["Leads on implementing and reviewing collaboratively with the EE team and wider stakeholders, initiatives (both internal and external) at key experience touch-points. Measuring outcomes to incorporate required changes.", "2", "48"],
                    ["Performs redesign of CVP and EVP at scale to meet and exceed upon expectations of business and agreed global SLA’s. Construction of strategies that combine human and technological approaches.", "3", "48"],
                    ["Comprehension of the various staffing solutions that can both support company success against demand plans and the employee experience based on the company structure and drivers.", "0", "49"],
                    ["Ability to support Talent team with range of elements focusing on RLC process/practices journey regardless of staffing solution applied.", "1", "49"],
                    ["Leads on driving and implementing all practices of recruitment to the particular staffing solution appointed by the organisation. Guides, advices, reviews and advocates change based on data reporting on those areas identified as requiring change.", "2", "49"],
                    ["Directs practices required for the specific staffing solutions globally which organisation has adopted. Direction and initiatives based on the specific needs to accommodate CVP and EVP for company structure.", "3", "49"],
                    ["A comprehension of what change management is and its relevance to business overall.", "0", "50"],
                    ["Ability to identify and action on tasks within the arena of recruitment what areas can be effected by a change management process or method to promote increased success.", "1", "50"],
                    ["Leads on implementing all approaches within Recruitment & Delivery team functions that prepare and support individuals, teams and the business to make organisational change. Change drivers to include technology, process reviews and company structure.", "2", "50"],
                    ["Performs tasks associated to that of primary lead. Constructs, leads and advises on methods that redirect or redefine the use of resources, business process, budget allocations that change / effect employee engagement and experience throughout the entire organisation.", "3", "50"],
                    ["Understanding of processes that facilitate internal mobility/recruitment.", "0", "51"],
                    ["Ability to facilitate internal recruitment through agreed internal RLC.", "1", "51"],
                    ["Working in tangent with Talent team colleagues to lead and drive the positive candidate experience through process. Emphasis on communication consistency of communication and advise supporting successful and seamless transition.", "2", "51"],
                    ["Identifies and leads on key touch points to support employee journey through the process of transition. Collaboration with both stakeholders and wider colleagues ensuring compliance and seamless landing.", "3", "51"],
                    ["Comprehension of the business goals, strategies and practices for consultation.", "0", "52"],
                    ["Ability to highlight, call out and advise within areas of recruitment — continuously collaborating and sharing information with global communities and Talent team colleagues.", "1", "52"],
                    ["Leads on keeping abreast of market trends and behaviours, to ensure best practice and current trends are adopted in to RLC — formulating of strategies where required to drive success.", "2", "52"],
                    ["Acts a primary lead to all teams, drives change and improvements through wider team collaboration. Reviews strategies and implements change against long term company goals taking into account at all times effects on retention and retention.", "3", "52"],
                    ["A comprehension of Talent processes aligned to the supporting of RLC.", "0", "53"],
                    ["Ability to interpret and implement processes associated with RLC through collaboration with wider talent team and wider teams.", "1", "53"],
                    ["Acts as change agent providing thought leadership with regard to recruitment & delivery and best practice.", "2", "53"],
                    ["Identifies, develops and executes process plans to continuously drive recruitment productivity improvements.", "3", "53"],
                    ["Aware of the importance consider developing process efficiency and the common ways in which processes are optimised. Supports specific activities to improve development processes. Able to spot or identify obvious deficiencies.", "0", "54"],
                    ["Able to identify process optimisation opportunities with guidance and contribute to the implementation of proposed solutions.", "1", "54"],
                    ["Able to analyse current processes, identify and implement opportunities to optimise processes, and leads and develops a team of experts to deliver service improvements. Helps evaluate and establish requirements for the implementation of changes by setting policy and standards.", "2", "54"],
                    ["Mentoring, governance, career development.", "3", "54"],
                    ["Aware of the importance of adopting a modern standards approach.", "0", "55"],
                    ["Understands key principles of modern standards approach and how they apply to the work they are undertaking, and will apply under guidance.", "1", "55"],
                    ["Uses a modern standards approach competently and guides others in so doing.", "2", "55"],
                    ["Strong understanding and application of the most appropriate modern standards and practices. Takes responsibility for coaching and guiding others.", "3", "55"],
                    ["N/A", "0", "56"],
                    ["Able to research and suggest trends from previous years to develop budget plans for fiscal year.", "1", "56"],
                    ["Able to identify and utilise trends from previous years to develop budget plans for fiscal year. Based on current projection of client work and staffing levels. As well as projecting the growth congruent with growth goals.", "2", "56"],
                    ["Able to advise and make decisions on budget plans for fiscal year. Based on current and future projection of client work and staffing levels.", "3", "56"],
                    ["N/A", "0", "57"],
                    ["Reports SAP (FLEX) data correctly from each studios, and aware of how it feeds into P&L dashboard.", "1", "57"],
                    ["Builds and maintains dashboards and reports that identify P&L profiles based on SAP (FLEX) reporting data", "2", "57"],
                    ["Able to communicate and negotiate with stakeholders in order to manage the position of buildit’s P&L based on SAP (FLEX) reporting data.", "3", "57"],
                    ["N/A", "0", "58"],
                    ["Able to perform cost analysis and suggest trends and forecasts.", "1", "58"],
                    ["Guides cost analysis process by enforcing policies and procedures. Able to prove trends and forecasts, and explain the processes and techniques used.", "2", "58"],
                    ["Guides cost analysis by establishing policies and procedures. Recommends actions based on cost analysis, trends, and forecasts.", "3", "58"],
                    ["", "0", "59"],
                    ["Able to work within Wipro Digital to use common systems and systems developed to have a source of truth.", "1", "59"],
                    ["Uses all systems available and drives improvements that will increase efficiencies in current systems and reporting capabilities.", "2", "59"],
                    ["Identifies the need to change and improvement to current or outdated practices, in order to accurately predict and drive business.", "3", "59"],
                    ["", "0", "60"],
                    ["", "1", "60"],
                    ["", "2", "60"],
                    ["", "3", "60"],
                    ["", "0", "61"],
                    ["", "1", "61"],
                    ["", "2", "61"],
                    ["", "3", "61"],
                    ["", "0", "62"],
                    ["", "1", "62"],
                    ["", "2", "62"],
                    ["", "3", "62"],
                    ["", "0", "63"],
                    ["", "1", "63"],
                    ["", "2", "63"],
                    ["", "3", "63"],
                    ["", "0", "64"],
                    ["", "1", "64"],
                    ["", "2", "64"],
                    ["", "3", "64"],
                    ["", "0", "65"],
                    ["", "1", "65"],
                    ["", "2", "65"],
                    ["", "3", "65"]
                ],
                skillLinkageGroup: [
                    ["1", "1", "1"],
                    ["1", "2", "1"],
                    ["1", "3", "1"],
                    ["1", "4", "1"],
                    ["1", "5", "1"],
                    ["1", "6", "1"],
                    ["1", "7", "1"],
                    ["1", "8", "1"],
                    ["1", "9", "0"],
                    ["1", "10", "0"],
                    ["1", "11", "0"],
                    ["2", "12", "1"],
                    ["2", "13", "1"],
                    ["2", "14", "1"],
                    ["2", "15", "1"],
                    ["2", "16", "1"],
                    ["2", "17", "0"],
                    ["2", "18", "0"],
                    ["3", "19", "1"],
                    ["3", "20", "1"],
                    ["3", "21", "1"],
                    ["3", "22", "1"],
                    ["3", "23", "1"],
                    ["3", "24", "1"],
                    ["3", "25", "1"],
                    ["3", "26", "0"],
                    ["3", "27", "0"],
                    ["3", "28", "0"],
                    ["3", "29", "0"],
                    ["4", "30", "1"],
                    ["4", "31", "1"],
                    ["4", "32", "1"],
                    ["4", "33", "1"],
                    ["4", "34", "1"],
                    ["4", "35", "1"],
                    ["4", "36", "1"],
                    ["4", "37", "1"],
                    ["5", "38", "1"],
                    ["5", "39", "1"],
                    ["5", "40", "1"],
                    ["5", "41", "1"],
                    ["5", "42", "1"],
                    ["5", "43", "1"],
                    ["5", "44", "1"],
                    ["5", "45", "1"],
                    ["5", "46", "1"],
                    ["5", "47", "1"],
                    ["5", "48", "1"],
                    ["5", "49", "1"],
                    ["5", "50", "0"],
                    ["5", "51", "0"],
                    ["5", "52", "0"],
                    ["5", "53", "0"],
                    ["6", "54", "1"],
                    ["6", "55", "1"],
                    ["6", "56", "1"],
                    ["6", "57", "1"],
                    ["6", "58", "1"],
                    ["6", "59", "1"],
                    ["7", "60", "1"],
                    ["7", "61", "1"],
                    ["7", "62", "1"],
                    ["7", "63", "1"],
                    ["7", "64", "1"],
                    ["7", "65", "1"]
                ],
                skillsHolisiticObject: {
                    roles: [],
                    skillGroups: [],
                    skillLevels: [],
                    skills: [],
                    users: [],


                },
                prepForLinkage: [],
                skillMatchcounter: 0
            };
        },
        created: function () {


            fb.rolesCollection.get().then(docs => {
                docs.forEach(doc => {
                    let role = doc.data();
                    role.r_id = doc.id;
                    this.skillsHolisiticObject.roles.push(role);
                });
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

            fb.skillGroupsCollection.get().then(docs => {
                docs.forEach(doc => {
                    let role = doc.data();
                    role.sg_id = doc.id;
                    this.skillsHolisiticObject.skillGroups.push(role);
                });


            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

            fb.skillLevelsCollection.get().then(docs => {
                docs.forEach(doc => {
                    let role = doc.data();
                    role.sl_id = doc.id;
                    this.skillsHolisiticObject.skillLevels.push(role);
                });
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });


            fb.usersCollection.get().then(docs => {
                docs.forEach(doc => {
                    let role = doc.data();
                    role.u_id = doc.id;
                    this.skillsHolisiticObject.users.push(role);
                });
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

            fb.skillsCollection.get().then(docs => {
                docs.forEach(doc => {
                    let role = doc.data();
                    role.s_id = doc.id;
                    this.skillsHolisiticObject.skills.push(role);
                });
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        },
        methods: {
            processGroups() {
                console.clear();
                fb.skillGroupsCollection.get().then(docs => {
                    docs.forEach(doc => {
                        let currentGroup = doc.data();
                        currentGroup.sg_id = doc.id;

                        let checker = false;

                        for (let i = 0; i < this.skillGroupsOriginal.length; i++) {
                            // console.log(this.skillGroupsOriginal[i])
                            if (currentGroup.name === this.skillGroupsOriginal[i]) {

                                this.skillMatchcounter++;
                                checker = true;

                                let skillCollection = {};

                                let targetNumber = 0;

                                for (let k = 0; k < this.skillLinkageGroup.length; k++) {
                                    if (parseInt(this.skillLinkageGroup[k][0]) === i + 1) {
                                        targetNumber++;
                                    }
                                }

                                for (let k = 0; k < this.skillLinkageGroup.length; k++) {
                                    if (parseInt(this.skillLinkageGroup[k][0]) === i + 1) {

                                        let s_id = '';
                                        let s_name = '';
                                        let is_required = false;

                                        if (this.skillLinkageGroup[k][2] === "1") {
                                            is_required = true;
                                        }


                                        let originalSkillName = this.skillsListOriginal[parseInt(this.skillLinkageGroup[k][1]) - 1][0];
                                        let originalSkillDesc = this.skillsListOriginal[parseInt(this.skillLinkageGroup[k][1]) - 1][1];

                                        fb.skillsCollection.where("name", "==", originalSkillName).where("description", "==", originalSkillDesc).get().then(docs => {
                                            docs.forEach(doc => {
                                                let skill = doc.data();
                                                //
                                                // console.log(skill.name, skill.description, doc.id)

                                                s_id = doc.id;
                                                s_name = skill.name;

                                                skillCollection[s_id] = {
                                                    s_id: s_id,
                                                    name: s_name,
                                                    required: is_required

                                                };


                                                if ( Object.keys(skillCollection).length === targetNumber) {

                                                    fb.skillGroupsCollection.doc(currentGroup.sg_id).set({
                                                        skills: skillCollection
                                                    },{merge: true});
                                                }
                                            }); // each result
                                        }); // skill lookup
                                    } // if match
                                } // for


                                if (currentGroup.sg_id === 'CXbrcD3wa171tjcXGErx') {
                                    // console.log(skillCollection)



                                }


                                break;
                            } // if match
                        } // for

                        if (checker === false) {
                            console.log('error');
                            console.log(currentGroup.name, currentGroup.description);
                        }


                    });


                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });

            },
            processSkillDescriptions() {


                // 06yOPb2J0EV0zTXD4LNI


                fb.skillsCollection.get().then(docs => {
                    docs.forEach(doc => {
                        let role = doc.data();
                        role.s_id = doc.id;

                        let checker = false;

                        for (let i = 0; i < this.skillsListOriginal.length; i++) {
                            if (
                                role.name === this.skillsListOriginal[i][0] &&
                                role.description === this.skillsListOriginal[i][1]
                            ) {
                                // console.log('---');
                                // console.log(role.name);
                                this.skillMatchcounter++;
                                checker = true;

                                let levelDescriptions = {};

                                for (let k = 0; k < this.skillDescriptionsOriginal.length; k++) {
                                    // console.log(parseInt(this.skillDescriptionsOriginal[k][2]))
                                    if (parseInt(this.skillDescriptionsOriginal[k][2]) === i + 1) {
                                        let sl_id = '';
                                        let sl_name = '';

                                        switch (this.skillDescriptionsOriginal[k][1]) {
                                            case '0':
                                                sl_id = "bLAp0tSoaMWgDHtJvnen";
                                                sl_name = "Aware";
                                                break;
                                            case '1':
                                                sl_id = "s5r4BcrG03FQLsP7H4Ij";
                                                sl_name = "Working";
                                                break;
                                            case '2':
                                                sl_id = "YwW51YBBSPhxyRkGRXGB";
                                                sl_name = "Practitioner";
                                                break;
                                            case '3':
                                                sl_id = "lCrjIzHtu0NNWOvSFvrf";
                                                sl_name = "Expert";
                                                break;
                                        }


                                        levelDescriptions[sl_id] = {
                                            sl_id: sl_id,
                                            sl_name: sl_name,
                                            description: this.skillDescriptionsOriginal[k][0]

                                        };


                                    }
                                }


                                // if (doc.id === '0um4e5o60w65ju1IqNJB'){
                                //
                                //     console.log(levelDescriptions)
                                //     console.log('yep')

                                fb.skillsCollection.doc(doc.id).set({
                                    levels: levelDescriptions
                                }, {merge: true});
                                // }


                                break;
                            }
                        }

                        if (checker === false) {
                            console.log('error');
                            console.log(role.name, role.description);
                        }
                    });
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });


            }
        }
    };
</script>

<style scoped>

</style>
