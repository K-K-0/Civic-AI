from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.complaints import Complaint
from app.ml.predict import predict_complaint

# realistic civic complaints
complaints_data = [
    {
        "title": "Garbage Overflow Near Market",
        "description": "Garbage bins are overflowing near the central market causing foul smell and insects."
    },
    {
        "title": "Street Light Not Working",
        "description": "Street lights in our colony have not been working for the past week."
    },
    {
        "title": "Road Full of Potholes",
        "description": "The main road is damaged badly with potholes causing accidents daily."
    },
    {
        "title": "Water Leakage Issue",
        "description": "Water pipeline leakage near the school wasting water continuously."
    },
    {
        "title": "Tree Plantation Drive",
        "description": "Residents planted 100 trees in the park area to improve the environment."
    },
    {
        "title": "Drainage Blocked",
        "description": "Drainage system is blocked causing waterlogging during rain."
    },
    {
        "title": "Illegal Garbage Dumping",
        "description": "People are dumping waste illegally near the residential area."
    },
    {
        "title": "Broken Traffic Signal",
        "description": "Traffic signal at the main intersection is not functioning properly."
    },
    {
        "title": "Park Cleaning Completed",
        "description": "Local volunteers cleaned the community park successfully."
    },
    {
        "title": "Noise Pollution at Night",
        "description": "Loudspeakers and vehicles are creating excessive noise at night."
    },
    {
        "title": "Sewage Water on Road",
        "description": "Sewage water is overflowing onto the roads creating unhygienic conditions."
    },
    {
        "title": "New Trees Planted",
        "description": "Community members planted new trees along the roadside."
    },
    {
        "title": "Damaged Footpath",
        "description": "Footpath tiles are broken making it difficult for pedestrians to walk safely."
    },
    {
        "title": "Electric Pole Sparks",
        "description": "Electric poles are sparking during rain and causing danger to residents."
    },
    {
        "title": "Cleanliness Drive Success",
        "description": "Students and volunteers successfully completed a cleanliness campaign."
    },
    {
        "title": "Overflowing Drain Near School",
        "description": "Drain near the school is overflowing and producing a bad smell."
    },
    {
        "title": "Heavy Traffic Jam",
        "description": "Traffic congestion near the highway is increasing every evening."
    },
    {
        "title": "Public Park Renovated",
        "description": "The public park has been renovated with new plants and seating."
    },
    {
        "title": "Broken Water Pipeline",
        "description": "Main water pipeline burst causing water shortage in nearby houses."
    },
    {
        "title": "Mosquito Problem Increasing",
        "description": "Stagnant water is increasing mosquito breeding in the colony."
    },
    {
        "title": "Road Repair Completed",
        "description": "The damaged road near the bus stop has finally been repaired."
    },
    {
        "title": "Garbage Collection Delayed",
        "description": "Garbage collection vehicles have not arrived for several days."
    },
    {
        "title": "New Community Garden",
        "description": "Residents created a beautiful community garden with flowers and plants."
    },
    {
        "title": "Traffic Signal Timing Issue",
        "description": "Traffic lights are changing too quickly causing confusion among drivers."
    },
    {
        "title": "Waterlogging After Rain",
        "description": "Rainwater accumulates on roads due to poor drainage system."
    },
    {
        "title": "Illegal Construction Noise",
        "description": "Construction work is creating loud noise during late night hours."
    },
    {
        "title": "Street Dogs Creating Issues",
        "description": "Street dogs are attacking people near the market area."
    },
    {
        "title": "Solar Lights Installed",
        "description": "New solar-powered street lights have been installed successfully."
    },
    {
        "title": "Dust Pollution from Construction",
        "description": "Construction dust is affecting air quality in the neighborhood."
    },
    {
        "title": "Clean River Campaign",
        "description": "Volunteers cleaned plastic waste from the nearby river."
    },
    {
        "title": "Broken Speed Breaker",
        "description": "Speed breaker near the school has been damaged completely."
    },
    {
        "title": "Water Supply Restored",
        "description": "Regular water supply has resumed after pipeline maintenance."
    },
    {
        "title": "Garbage Burning Complaint",
        "description": "People are burning garbage openly causing air pollution."
    },
    {
        "title": "Roadside Trees Maintained",
        "description": "Municipal workers trimmed and maintained roadside trees properly."
    },
    {
        "title": "Manhole Left Open",
        "description": "Open manhole on the main road is dangerous for vehicles and pedestrians."
    },
    {
        "title": "Improved Waste Management",
        "description": "New waste segregation bins were installed in residential areas."
    },
    {
        "title": "Frequent Power Cuts",
        "description": "Frequent electricity outages are affecting daily activities."
    },
    {
        "title": "Clean Bus Stop Initiative",
        "description": "Local volunteers cleaned and painted the bus stop area."
    },
    {
        "title": "Blocked Sewer Line",
        "description": "Sewer lines are blocked causing wastewater overflow."
    },
    {
        "title": "Road Accident Due to Potholes",
        "description": "Several accidents are happening because of deep potholes."
    },
    {
        "title": "Rainwater Harvesting Installed",
        "description": "Residents installed rainwater harvesting systems successfully."
    },
    {
        "title": "Damaged Traffic Signs",
        "description": "Traffic signs near the junction are broken and unclear."
    },
    {
        "title": "Community Cleanliness Program",
        "description": "Children participated in a community cleanliness awareness drive."
    },
    {
        "title": "Water Tank Overflow",
        "description": "Public water tank is overflowing continuously wasting water."
    },
    {
        "title": "Green Initiative Success",
        "description": "School students planted hundreds of saplings around the campus."
    },
    {
        "title": "Uncollected Waste Near Hospital",
        "description": "Waste has not been collected near the hospital for many days."
    },
    {
        "title": "Broken Drain Cover",
        "description": "Drain cover is broken causing safety issues for pedestrians."
    },
    {
        "title": "Electricity Transformer Problem",
        "description": "Transformer near residential area is making loud noises."
    },
    {
        "title": "Successful Recycling Campaign",
        "description": "Residents actively participated in the recycling awareness campaign."
    },
    {
        "title": "Flooded Streets During Rain",
        "description": "Streets become flooded quickly after heavy rainfall."
    }
]

# create around 50 complaints
expanded_data = []

for i in range(5):
    for complaint in complaints_data:
        expanded_data.append({
            "title": f"{complaint['title']}",
            "description": complaint["description"]
        })


def seed_database():

    db: Session = SessionLocal()

    try:

        for item in expanded_data:

            # combine title + description
            text = f"{item['title']} {item['description']}"

            # AI predictions
            prediction = predict_complaint(text)

            complaint = Complaint(
                title=item["title"],
                description=item["description"],
                category=prediction["category"],
                priority=prediction["priority"],
                sentiment=prediction["sentiment"],
                status="Pending"
            )

            db.add(complaint)

        db.commit()

        print("✅ 50 AI-generated complaints inserted successfully")

    except Exception as e:

        db.rollback()

        print("❌ Error:", e)

    finally:

        db.close()


if __name__ == "__main__":
    seed_database()