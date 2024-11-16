# your_app/management/commands/populate_data.py

import random
from datetime import datetime, timedelta
import uuid

from django.core.management.base import BaseCommand
from django.utils import timezone
from ...models import Company, Offer, Domainactivity, Profession, Responsibilitie, Qualifications, Skill

class Command(BaseCommand):
    help = "Populate the database with meaningful French data."

    def handle(self, *args, **options):
        # List of example wilayas and dairas
        wilayas = ["Alger", "Oran", "Constantine", "Blida", "Annaba"]
        dairas = {
            "Alger": ["Bab El Oued", "El Harrach", "Bir Mourad Rais"],
            "Oran": ["Es-Senia", "Ain Turk", "Oran"],
            "Constantine": ["Zighoud Youcef", "El Khroub", "Ain Smara"],
            "Blida": ["Beni Merad", "Boufarik", "Blida"],
            "Annaba": ["El Bouni", "Sidi Amar", "Annaba"]
        }

        # Sample data for other fields
        job_levels = ["Débutant / junior", "Responsable équipe", "Cadre dirigean"]
        contract_types = ["CDI", "CDD", "Mission"]
        domain_names = ["Informatique", "Industrie", "Santé", "Commerce"]
        profession_names = ["Développeur", "Ingénieur", "Technicien", "Vendeur"]
        skill_names = ["Python", "Gestion de projets", "Communication", "SQL"]

        # Clear old data
        Company.objects.all().delete()
        Offer.objects.all().delete()
        Domainactivity.objects.all().delete()
        Profession.objects.all().delete()
        Responsibilitie.objects.all().delete()
        Qualifications.objects.all().delete()

        # Add domain activities and professions
        domains = [Domainactivity.objects.create(name=name) for name in domain_names]
        professions = [Profession.objects.create(name=name) for name in profession_names]
        skills = [Skill.objects.create(label=name) for name in skill_names]

        # Create companies
        for i in range(5):
            company = Company.objects.create(
                name=f"Entreprise {i+1}",
                address=f"Adresse {i+1}, {wilayas[i % len(wilayas)]}",
                phone_number=f"+213 {random.randint(100000000, 999999999)}",
                email=f"contact{i+1}@entreprise.com",
                website=f"http://www.entreprise{i+1}.dz",
                is_active=True,
                confirmation_code="123456",
                confirmation_code_created_at=timezone.now()
            )

            # Create offers for each company
            for j in range(3):  # Each company has 3 offers
                wilaya = random.choice(wilayas)
                offer = Offer.objects.create(
                    company=company,
                    title=f"Offre {random.randint(1, 1000)}",
                    job_level=random.choice(job_levels),
                    contract_type=random.choice(contract_types),
                    diplome="Bac+3 en Informatique",
                    start_date=timezone.now().date(),
                    end_date=timezone.now().date() + timedelta(days=30),
                    description="Une offre passionnante pour les développeurs motivés.",
                    contact="contact@entreprise.com",
                    available_spots=random.randint(1, 5),
                    domain_activity=random.choice(domains),
                    profession=random.choice(professions),
                    salary=random.randint(30000, 100000),
                    wilaya=wilaya,
                    daira=random.choice(dairas[wilaya]),
                    localisation="https://maps.example.com/location"
                )

                # Add responsibilities and qualifications to each offer
                responsabilities = [
                    "Développer de nouvelles fonctionnalités.",
                    "Collaborer avec l'équipe technique.",
                    "Assurer la maintenance des systèmes existants."
                ]
                qualifications = [
                    "Maîtrise de Python et Django.",
                    "Expérience avec les bases de données relationnelles.",
                    "Compétences en communication et travail en équipe."
                ]

                for desc in responsabilities:
                    Responsibilitie.objects.create(offer=offer, description=desc)

                for desc in qualifications:
                    Qualifications.objects.create(offer=offer, description=desc)

                # Associate skills with the offer
                offer.skills.set(random.sample(skills, k=2))  # Associate 2 random skills

        self.stdout.write(self.style.SUCCESS('Database populated with French data!'))
