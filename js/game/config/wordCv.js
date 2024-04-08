import { BuildConf_Base } from "../building/buildConf_base.js"
import { BuildConf_Place } from "../building/buildConf_place.js"
import { FactoryBuilding } from "../building/building.js"


export class WorldCv {
    
    constructor(world) {
        this.world = world
        this.tilesMatrix = world.tilesMatrix
        this.ta = world.tilesActions
    }

    start() {
 
        let [x, y] = this.tilesMatrix.getPos();

        /*
        // Name 
        [...Array(20)].map((_, idx )=> {
            this.ta.colorSquare(x, y+idx*2, 3, [0, 0, 0, 255])
            this.ta.colorSquare(x, y+idx*2, 1, [200, 200, 200, 255])
            this.ta.clearItemSquare(x, y+idx*2, 5)
        })
        */
        this.name(x, y);

        // CV
        x += 6;

        this.drawCV(x, y);



        // this.ta.lvlUpSquare(x, y-10, 3, 2)
        // this.ta.colorSquare(x, y-10, 3, [0, 0, 0, 255])

        // this.infinitStart(x, y)
        // this.markdown1(x, y)

        // this.markdown2(x, y)
        /*
        this.ta.lvlUpSquare(x,y+10, 3, 35)
        this.ta.lvlAvgSquare(x,y+10, 5)
        this.ta.lvlAvgSquare(x,y+10, 5)
        this.ta.lvlAvgSquare(x,y+10, 5)
        this.ta.colorSquare(x, y+10, 5, [0, 0, 0, 255])
        */
        /*
        // this.tilesActions.lvlUpSquare(x + 20 ,y + 5, 5, 5)
        {
            const factoryBuilding = new FactoryBuilding(this, new BuildConf_Donjon1())
            factoryBuilding.start(x, y);
        }
        */
    }



    name (x, y) {
        {
            const md = `
<div style="display:flex">
    <img src="./img/Portrai2.png" width="150px" height="150px">
    <div style="display: flex;flex-direction: column;justify-content: center;align-items: flex-end;">

## Hello 

 > #### Julien SCHLUTH
 > ###### Paris - France

</div>
</div>
    `
            this.ta.addBoxMD(x, y, {md:md, width:'300px'})
        }
        {
            const md = "#### ↗️ My CV ↗️"
            this.ta.addBoxMD(x+8, y+2, {md:md, width:'140px', style:"background-color:#333; color:#FFF"})
        }
    }

    drawCV(xx, yy) {
        let x = xx;
        let y = yy;

        const xspace = 9;
        const xspaceDate = 9;

        [...Array((xspace + xspaceDate) * 5 / 2)].map((_, idx )=> {
            this.ta.colorSquare(x+idx*2, y, 3, [0, 0, 0, 255])
            this.ta.colorSquare(x+idx*2, y, 1, [128, 128, 0, 255])
            this.ta.clearItemSquare(x+idx, y*2, 5)
        })


        x += 8;
        this.ta.addBoxMD(x, y, {md:"#### 📆 Now\n##### @Paris", width:'90px'})
        x += xspaceDate;
        this.XP1(x, y)
        x += xspace;

        this.ta.addBoxMD(x, y, {md:"#### 📆 2021\n##### @Paris", width:'90px'})
        x += xspaceDate;
        this.XP2(x, y)
        x += xspace;

        this.ta.addBoxMD(x, y, {md:"#### 📆 2017\n##### @Paris", width:'90px'})
        x += xspaceDate;
        this.XP3(x, y)
        x += xspace;

        this.ta.addBoxMD(x, y, {md:"#### 📆 2014\n##### @Paris", width:'90px'})
        x += xspaceDate;
        this.XP4(x, y)
        x += xspace;

        this.ta.addBoxMD(x, y, {md:"#### 📆 2011\n##### _@Lannion(22) - France_", width:'90px'})
        x += xspaceDate;
        this.XP5(x, y)
        x += xspace;

        this.ta.addBoxMD(x, y, {md:"#### 📆 2008\n##### _@Metz(57) - France_", width:'90px'})
        x += xspaceDate;
        this.XP6(x, y)
        x += xspace;


    }

    XP1(x, y) {
    
            const md = `

#### Oct2021 - Now - @Salsify/Alkemics ( Scale-up - Retail)
---
### Senior Data Engineer / Lead BI Solutions Architect

#### **Setting up knowledge sharing**

 > Upon the company's acquisition, I transitioned to an American team responsible for managing the company's BI data. Spearheading knowledge sharing efforts between the two entities, we facilitated the exchange of business and data insights, leveraging concrete data and processes to drive the realization of new global projects.

#### **Architectures for process integration**

 > In an integration context, led the seamless migration of all existing BI solutions to the new environment, encompassing dashboards, GTM data sources, and access rights (Google/Salesforce, etc.). 
 > Introduced innovative technical solutions to establish production data connectivity to a dedicated data center, optimizing job scheduling and data extraction/storage processes. Pre-manipulation of production data, enhancing the availability of actionable insights for the US BI team.

#### **Influencer internal BI products**

 > Empowered all business areas with data-driven decision-making capabilities. Instilled confidence in existing dashboards and BI tools through innovative enhancements. Orchestrated regular company-wide meetings and conferences on pertinent topics, fostering collaboration and alignment with GTM teams through dedicated weekly sessions.
        `
        this.ta.addBoxMD(x, y, {md:md, width:'500px'})
    }

    XP2(x, y) { 

        const md = `

#### 2017-2021 - @Alkemics. ( Scale-up - Retail)
---
### Senior Data Engineer / Lead BI Solutions Architect 

#### Setting up and leading the BI team

 >  Within a rapidly expanding company, scaling from 20 to 200 employees. Implemented internal communication workflows with Go-to-market teams and identified and prioritized data-driven initiatives crucial for company growth.

#### **Architected Powerfull BI solutions**

 > Optimizing technology stacks and making strategic tech choices to drive down platform costs while delivering superior performance. Integrated BI services seamlessly into the tech production process, ensuring accessibility for data analysts and connectivity to all company data sources, with scalability as a primary focus.

#### Developed internal BI products

 > Facilitating communication with Go-to-market teams, utilizing Kanban boards and Slack Channel to bring people together around a data subject and identify ad hoc analyses and future BI products.
 
 > Introduced a BI Web platform with a DataBoard feature, providing comprehensive data handling tools covering all market processes of the company centralized all in one place. Used in the daily work of teams.
            


        `
        this.ta.addBoxMD(x, y, {md:md, width:'500px'})
    }

    XP3(x, y) { 
        const md = `

#### Oct2014 - 2017 - @Alkemics ( Start-Up - Retail)
---

### Senior Data Scientist / Data Engineer 

#### Design of robust data storage and processing solutions

 > Optimized the indexes and the deployment of Elasticsearch services for efficient product catalog management. 

 > Pioneer in the implementation of BI services within an Azure/Tableau architecture.

#### Spearheading innovation 
 
 > Research into technical solutions for large-scale catalog management 
 (retail catalog, PIM, targeting), contributing to the development of core production services.

#### Act as a data-driven influencer

 > Work closely with marketing teams to explore the market and test ideas through bespoke technical solutions. 
 
 > Market exploration and testing of ideas through personalized technical solutions. Dynamic adaptation of storage strategies 
 to meet changing business needs.

        `
        this.ta.addBoxMD(x, y, {md:md, width:'500px'})
    }

    XP4(x, y) { 
        const md = `

#### Mai2012 - Oct2014 @Ezakus ( Start-Up - E-Publicité )
---
### Senior Data Scientist 

#### Spearheading innovation 

> Design of refined segmentation and performance measurement methodologies in close collaboration with customer stakeholders, adapting technical and algorithmic solutions to meet specific advertising needs.  ( Look-a-Like and Pre-Targeting.... ) 

 #### Design large-scale solution

 > Design customized topologies for product and marketing targeting, technical optimization strategy and campaign KPI reporting. 

 > Act as a bridge between technical teams and GTM, to anticipate technical requirements enabling the implementation of targeting algorithms. 
          `
        this.ta.addBoxMD(x, y, {md:md, width:'500px'})
    }


    XP5(x, y) { 
        const md = `

#### 2011(6m)  @Alstom presta( Multinationale )
#### 2011(6m)  @DGI <= Sopra ( General Tax Directorate )
---
### Senior Software Ingenier 
 > Software maintenance 
 
 > Formateur for internal team to a new software application

---
#### 2008 - 2011  @OrangeLab - Lannion (22).
---
### Data Sientist - Machine Learning 
 
> Development of a data preparation and modeling tool, as well as analysis and model evaluation tools for data mining projects.
 
 > Advanced algorithm development (neural networks, decision trees, collaborative filtering) in collaboration with a mathematics research team.
 
 > Design/Research in recommendation engines (Netflix Challenge - 2010).
 
 

 `
        this.ta.addBoxMD(x, y, {md:md, width:'500px'})
    }



    XP6(x, y) { 
        const md = `

#### Ingénieur en Informatique - EPITA
####  Spe: Science Cognitive et Intelligence Artificielle 
---
 > **2005** - Indexing tools (such as Google Desktop Search) - Internship-StartUp Paris (75).

 > **2004** - Database design for a dating website - Internship-StartUp Paris (75).

 > **2002** - 2007 - EPITA - School for Computer Science and Advanced Techniques - Paris (75)
---

### Bac S en option physique , mécanique et électronique.
---
 > **2000** - Louis Vincent High School - Metz (57)

 > **1998-2000** - Child Animator / Computer Space Administrator - Metz (57).

 `
        this.ta.addBoxMD(x, y, {md:md, width:'500px'})
    }



    



    markdown2(x, y) {
        const md = `
| foo |
| --- |

| foo | bar |
| --- | --- |
| baz | bim |

`
        this.ta.addBoxMD(x, y-5, {md:md, width:'100px'})
    }


    _MD(x, y, md) {
        this.ta.colorSquare(x, y, 1, [0, 0, 0, 255])
        this.ta.lvlUp(x, y, 2)
        this.ta.addBoxMD(x, y, {md:md, width:'140px'})
    }


    infinitStart(x, y) {


        this._MD(x-10, y + 10, `## ⬆️ ➡️ ⬇️ ⬅️`)
        this._MD(x-10, y + 12, `## ↖️ ↗️ ↘️ ↙️`)
        this._MD(x-10, y + 14, `## ▶️ ⏹ ⏺ ⏸`)
        this._MD(x-10, y + 16, `## 🔄 ✅ ⚠️ ⭕️`)



        this._MD(x, y - 5, `### 🌎 Earth`)
        
        this._MD(x, y + 5, `### 🌬️ Wind`)
        
        this._MD(x - 5, y, `### 🔥 Fire`)
        
        this._MD(x + 5, y, `### 💧 Water`)
        



    }


}