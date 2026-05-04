import Foundation
import SwiftUI

// MARK: - Category (Restricted set)
enum BlueprintCategory: String, CaseIterable, Identifiable {
    case health
    case career
    case learning
    case finance
    case personal

    var id: String { self.rawValue }

    var displayName: String {
        switch self {
        case .health: return "Health"
        case .career: return "Career"
        case .learning: return "Learning"
        case .finance: return "Finance"
        case .personal: return "Personal"
        }
    }

    var color: Color {
        switch self {
        case .health: return .green
        case .career: return .blue
        case .learning: return .orange
        case .finance: return .purple
        case .personal: return .pink
        }
    }
}

// MARK: - Task (Constrained)
struct Task: Identifiable, Equatable {
    let id = UUID()
    var title: String
    var isDone: Bool = false

    // Validation constraint
    var isValid: Bool {
        let trimmed = title.trimmingCharacters(in: .whitespacesAndNewlines)
        return !trimmed.isEmpty && trimmed.count <= 80
    }
}

// MARK: - Blueprint (Core Model)
struct Blueprint: Identifiable {
    let id = UUID()
    var goal: String
    var category: BlueprintCategory
    private(set) var tasks: [Task]

    init(goal: String, category: BlueprintCategory, tasks: [Task] = []) {
        self.goal = String(goal.prefix(120)) // max 120 chars
        self.category = category
        self.tasks = []
        setTasks(tasks)
    }

    // Enforce constraints on tasks
    mutating func setTasks(_ newTasks: [Task]) {
        let cleaned = newTasks
            .filter { $0.isValid }

        self.tasks = Array(cleaned.prefix(7)) // max 7 tasks
    }

    // Toggle completion safely
    mutating func toggleTask(id: UUID) {
        guard let index = tasks.firstIndex(where: { $0.id == id }) else { return }
        tasks[index].isDone.toggle()
    }

    // Progress tracking
    var progress: Double {
        guard !tasks.isEmpty else { return 0 }
        let completed = tasks.filter { $0.isDone }.count
        return Double(completed) / Double(tasks.count)
    }
}

// MARK: - Store (App State Controller)
final class BlueprintStore: ObservableObject {
    @Published private(set) var blueprint: Blueprint?

    // Create new blueprint
    func createBlueprint(goal: String, category: BlueprintCategory) {
        let trimmedGoal = goal.trimmingCharacters(in: .whitespacesAndNewlines)

        guard !trimmedGoal.isEmpty else { return }

        blueprint = Blueprint(goal: trimmedGoal, category: category)
    }

    // Apply AI-generated tasks safely
    func applyAITasks(_ rawTasks: [String]) {
        guard var bp = blueprint else { return }

        let tasks = rawTasks.map {
            Task(title: String($0.prefix(80)))
        }

        bp.setTasks(tasks)
        blueprint = bp
    }

    // Toggle task completion
    func toggleTask(_ id: UUID) {
        guard var bp = blueprint else { return }
        bp.toggleTask(id: id)
        blueprint = bp
    }

    // Optional: reset everything
    func reset() {
        blueprint = nil
    }
}
