from enum import Enum



class Situation(Enum):
      CONTRACT_END = "En Fin de Contrat"
      EMPLOYED= "En Poste"
      UNEMPLOYED= "Sans Emploi"

class Gender(Enum):
      MALE = "Homme"
      FEMALE = "Femme"


class NiveauLangue(Enum):
    BEGINNER  = "Débutant"
    INTERMEDIATE  = "Intermédiaire"
    ADVANCED  = "Avancé"
    FLUENT  = "Courant"
    NATIVE = "Natif"


class Mobility(Enum):
      REGIONAL = "Régional"
      NATIONAL = "National"
      INTERNATIONAL = "International"

class Job_level(Enum):
      BEGINNER_JUNIOR = 'Débutant / junior'
      TEAM_LEADER = 'Responsable équipe'
      EXECUTIVE = 'Cadre dirigeant'
      INTERN_STUDENT = 'Stagiaire étudiant'
      MANAGER_DEPARTMENT_HEAD = 'Manager / responsable departement'
      CONFIRMED_EXPERIENCED = 'Confirme experimente'
      RECENT_GRADUATE = 'Jeune diplome'
      TEST = 'Test'

class Contract_type(Enum):
      Indefinite_term = 'CDI'
      Fixed_term = 'CDD'
      Mission = 'Mission'




class Contact_type(Enum):
      Email = "Email"
      Phone = "Phone"